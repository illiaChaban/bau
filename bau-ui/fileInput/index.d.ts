declare module "@grucloud/bau-ui/fileInput" {
  export type FileInputProps = {
    disabled?: boolean;
  };

  type Component = import("../bau-ui").Component<
    FileInputProps,
    HTMLInputElement
  >;

  export default function (context: any): Component;
}
