type TabHeaderProps = {
  title: string;
  cancel: boolean;
  back: boolean;
  onCancel: () => void;
  onBack?: () => void;
};
