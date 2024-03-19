import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type BoxProps = {
  children: React.ReactNode;
  flexDirection?: "row" | "column";
  justifyContent?: "center" | "space-between" | "space-around" | "space-evenly";
  alignItems?: "center" | "space-between";
  alignSelf?: "center";
  height?: number | string;
  width?: number | string;
  p?: Spacing;
  m?: Spacing;
  pv?: Spacing;
  ph?: Spacing;
  mv?: Spacing;
  mh?: Spacing;
  pt?: Spacing;
  pb?: Spacing;
  pl?: Spacing;
  pr?: Spacing;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
  style?: any;
};

type CustomTextProps = {
  fontSize?: FontSize;
  color?: AppColors;
  lineHeight?: number;
  fontFamily?:
    | "Poppins-Regular"
    | "Poppins-Medium"
    | "Poppins-SemiBold"
    | "Poppins-Bold"
    | "Inter-Bold"
    | "Inter-SemiBold"
    | "Inter-Medium"
    | "Inter-Regular";
};

type TextButtonProps = {
  label: string;
  onPress?: () => void;
  color?: string;
  borderColor?: string;
  fontSize?: string;
  containerStyles?: EStyleSheet.AnyObject;
  labelStyles?: EStyleSheet.AnyObject;
};

type InputProps = {
  disableCopyPaste?: boolean;
  callOnFocus?: () => any;
  textButton?: TextButtonProps;
  showTextButton?: boolean;
  error?: string;
  noMargin?: boolean;
  endIcon?: IconDefinition;
  endIconPress?: () => void;
  renderEndIcon?: () => any;
  label?: string;
  propsStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  input?: ViewStyle;
};

type PrimaryButtonProps = {
  onPress: () => void;
  label: string;
  buttonStyle?: ViewStyle;
  labelStyle?: EStyleSheet.AnyObject;
  varient?: "Primary" | "Secondary" | "HotDeal" | "Alert";
  disabled?: boolean;
};

type SignUpProps = {
  navigation: StackNavigationProp<RootStackParamList, "SignUp">;
};

type LoginProps = {
  navigation: StackNavigationProp<RootStackParamList, "Login">;
};

type SplashProps = {
  navigation: StackNavigationProp<RootStackParamList, "Splash">;
};

type IntroProps = {
  navigation: StackNavigationProp<RootStackParamList, "Intro">;
};

type WelcomeProps = {
  navigation: StackNavigationProp<RootStackParamList, "Welcome">;
};

type ResetPasswordProps = {
  onPress: () => void;
};

type LoaderProps = {
  status?: string;
  isSheet?: boolean;
};

type SnackProps = {
  title: string | null;
  mode: SnackMode;
  close: (delay: number) => void;
  setTimer: (timer: NodeJS.Timer) => void;
};

type HeaderProps = {
  back: boolean;
  title?: string;
  onPress?: () => void;
};

type EditProfileProps = {
  navigation: StackNavigationProp<RootStackParamList, "EditProfile">;
};

type TextInProps = {
  label: string;
  input?: ViewStyle;
  error?: string;
};

type ImagePickerProps = {
  onSaveImage: (images: Image[] | null) => void;
};

type SuscriptionButtonProps = {
  data: subscriptionType;
  onPress: () => void;
};

type SubscriptionProps = {
  navigation: StackNavigationProp<RootStackParamList, "Subscription">;
};

type CardProps = {
  data: HOME_LIST;
  onPress: (id: number) => void;
  onPressLike: (pId: number, uId: number) => void;
};

type HomeProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

type DetailsPageProps = MaterialTopTabScreenProps<
  ProductsTabsParamList,
  "DetailsPage"
>;

type CategoriesPrps = MaterialTopTabScreenProps<
  ProductsTabsParamList,
  "Categories"
>;

type CustomDropDownProps = {
  selectedValue?: any;
  onValueChange?: (itemValue: any, itemIndex: any) => void;
  data: { label: string; value: string; enabled?: boolean }[];
  enabled?: boolean;
  title: string;
  onPressCamera?: () => void;
  selectPhoto?: string;
  isMandatory?: boolean;
  error?: string;
  isRegister?: boolean;
  placeholder?: string;
};

type UploadImageProps = MaterialTopTabScreenProps<
  ProductsTabsParamList,
  "UploadImage"
>;

type PaymentProps = MaterialTopTabScreenProps<ProductsTabsParamList, "Payment">;

type CustomAlertBoxProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  buttonLabel1: string;
  buttonLabel2: string;
  onPressFirstButton: () => void;
  onPressSecondButton: () => void;
};

type CustomHeaderProps = {
  title: string;
  iconName: string;
  isDetail?: boolean;
  back?: boolean;
  onPressIconName?: () => void;
  isSecondIcon?: boolean;
  isProfile?: boolean;
};

type ProfileProps = {
  navigation: StackNavigationProp<RootStackParamList, "Profile">;
  route: RouteProp<RootStackParamList, "Profile">;
};

type PostedCardProps = {
  data: POSTED_ITEMS;
  onPress: (id: number) => void;
  onPressDots: (id: number) => void;
};

type DetailsProps = {
  navigation: StackNavigationProp<RootStackParamList, "Details">;
  route: RouteProp<RootStackParamList, "Details">;
};
