import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
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
  varient?: "Primary" | "Secondary" | "HotDeal";
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

type ProfileProps = {
  navigation: StackNavigationProp<RootStackParamList, "Profile">;
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

<<<<<<< HEAD

=======
type DetailsPageProps = MaterialTopTabScreenProps<
  ProductsTabsParamList,
  "DetailsPage"
>;
>>>>>>> 4facaeebf2cd0d85f4e4e83e134ba0d8a72a2b1d
