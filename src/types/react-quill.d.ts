declare module "react-quill" {
  import React from "react";

  export interface ReactQuillProps {
    value?: string;
    onChange?: (content: string) => void;
    modules?: any;
    formats?: string[];
    placeholder?: string;
    theme?: string;
    className?: string;
    [key: string]: any;
  }

  const ReactQuill: React.FC<ReactQuillProps>;
  export default ReactQuill;
}
