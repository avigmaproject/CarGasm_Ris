import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Box from "../../components/Box";
import Input from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton";
import TabHeader from "./component/TabHeader";
import { CategoriesPrps } from "../../types/propTypes";
import CustomDropdown from "../../components/CustomDropDown";
import { useDispatch } from "react-redux";
import { getCategoriesData } from "../../redux/ducks/getCategories";
import { ProductContext } from "../../contexts/ProductTabContext";
import { useAppSelector } from "../../utils/hooks";
import { getBrandsData } from "../../redux/ducks/getBrandList";

const data = [
  { label: "Auto Car", value: 1 },
  { label: "Car", value: 2 },
];

export default function Categories({ navigation }: CategoriesPrps) {
  const dispatch = useDispatch<any>();
  const { brand, setBrand, categ, setCateg, subCateg, setSubCateg } =
    useContext(ProductContext);
  const [errors, setErrors] = useState<CategoriesErrors>();
  const [categories, setCategories] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [brands, setBrands] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const selectCategories = useAppSelector((state) => state.getCategories);
  const selectBrand = useAppSelector((state) => state.getBrandList);

  useEffect(() => {
    dispatch(getCategoriesData(0, "", 1, 100, "", 1, 0));
    dispatch(getBrandsData(0, "", 1, 100, "", 1, 0));
  }, []);

  useEffect(() => {
    if (selectCategories.called) {
      const transformedData = [];
      for (const arr2 of selectCategories[0][0]) {
        transformedData.push({
          label: arr2.CM_Name,
          value: arr2.CM_PkeyID,
        });
      }
      setCategories(transformedData);
    }
    if (selectBrand.called) {
      const transformedData = [];
      for (const arr2 of selectBrand[0][0]) {
        transformedData.push({
          label: arr2.BM_Name,
          value: arr2.BM_Name,
        });
      }
      setBrands(transformedData);
    }
  }, [selectCategories, selectBrand]);

  function validateInputs() {
    const tempErrors: CategoriesErrors = {};
    if (brand.length === 0) {
      tempErrors.brandError = "Enter a valid brand";
    }
    if (categ.length === 0) {
      tempErrors.categoriesError = "Select a valid Category";
    }
    // if (subCateg.length === 0) {
    //   tempErrors.subCategoriesError = "Select a valid Sub-Category";
    // }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  const onNext = () => {
    const isValid = validateInputs();
    if (isValid) {
      navigation.navigate("UploadImage");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabHeader title={"Post Product"} back cancel={false} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Box ph={20}>
          <Box mt={10}>
            <CustomDropdown
              data={brands}
              title="Select Brand"
              selectedValue={brand}
              onValueChange={setBrand}
              error={errors?.brandError}
            />
            <CustomDropdown
              data={categories}
              title="Select Categories"
              selectedValue={categ}
              onValueChange={setCateg}
              error={errors?.categoriesError}
            />
            {+categ !== 0 && (
              <CustomDropdown
                data={data}
                title="Select Sub-Categories"
                selectedValue={subCateg}
                onValueChange={setSubCateg}
                error={errors?.subCategoriesError}
              />
            )}
          </Box>

          <Box mt={20}>
            <PrimaryButton label="Next" onPress={onNext} />
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#F4F4F4",
  },
});
