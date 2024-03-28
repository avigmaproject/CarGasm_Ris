import React, { useEffect, useState } from "react"
import Box from "../../../components/Box"
import { useDispatch } from "react-redux"
import { getPostedItemsList } from "../../../redux/ducks/getPostedItems"
import { useAppSelector } from "../../../utils/hooks"
import { ProfileProps } from "../../../types/propTypes"
import { FlashList } from "@shopify/flash-list"
import {
  Dimensions,
  ListRenderItemInfo,
  Platform,
  StyleSheet
} from "react-native"
import { RefreshControl } from "react-native-gesture-handler"
import Card from "../../home/component/Card"
import PostedCard from "./PostedCard"
import Modal from "react-native-modalbox"
import CustomText from "../../../components/CustomText"
import colors from "../../../utils/color"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
const height = Dimensions.get("window").height
const width = Dimensions.get("window").width
const list = [
  { label: "Edit Posted Item", icon: "pencil-outline" },
  { label: "Delete Post", icon: "delete-outline" }
]

export default function PostedItemsPage({ navigation }: ProfileProps) {
  const dispatch = useDispatch<any>()
  const selectPostedItems = useAppSelector((state) => state.getPostedItems)
  const [postedItem, setPostedItem] = useState<POSTED_ITEMS[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    navigation.addListener("focus", onFocus)
    return () => {
      navigation.removeListener("focus", onFocus)
    }
  }, [])

  function onFocus() {
    dispatch(getPostedItemsList(3, 0, 1, "string", 1, 100, "string", 0))
  }

  function onRefresh() {
    setRefreshing(true)
    dispatch(getPostedItemsList(1, 0, 1, "string", 1, 100, "string", 0))
  }

  function onPressDots(id: number) {
    setShowModal(true)
  }

  function onClosedModal() {
    setShowModal(false)
  }

  const renderItem = ({ item }: ListRenderItemInfo<POSTED_ITEMS>) => {
    return <PostedCard data={item} onPressDots={onPressDots} />
  }

  useEffect(() => {
    if (selectPostedItems.called) {
      setRefreshing(false)
      setPostedItem(selectPostedItems[0][0])
    }
  }, [selectPostedItems])

  return (
    <>
      <Box style={styles.flat}>
        <FlashList
          data={postedItem}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          estimatedItemSize={200}
          contentContainerStyle={{
            paddingBottom: Platform.OS === "android" ? 300 : 250
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </Box>
      <Modal
        backdrop
        isOpen={showModal}
        onClosed={onClosedModal}
        style={styles.modal}
        coverScreen
      >
        {list.map((el, index) => {
          return (
            <Box
              key={index.toString()}
              flexDirection="row"
              alignItems="center"
              pv={10}
              ph={15}
            >
              <Icon name={el.icon} size={25} color={colors.textColor} />
              <CustomText
                fontSize={14}
                lineHeight={17}
                fontFamily="Inter-Medium"
                color={colors.textColor}
                style={{ left: 10 }}
              >
                {el.label}
              </CustomText>
            </Box>
          )
        })}
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  flat: {
    height: "100%"
  },
  modal: {
    height: "auto",
    width: width * 0.45,
    borderRadius: 8
  }
})
