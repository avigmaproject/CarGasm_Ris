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
};

type ImagePickerProps = {
  onSaveImage: (images: Image[] | null) => void;
};
