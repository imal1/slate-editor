import * as React from "react";
import ReactDom from "react-dom";
import SlateEditor, { valueTohtml } from "slate-editor";

class ImageExtension extends React.Component<any> {
  inputRef = React.createRef<HTMLInputElement>();

  handleClick = () => {
    if (this.inputRef.current) {
      this.inputRef.current.click();
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        let change = this.props.change.focus().insertInline({
          object: "inline",
          type: "image",
          isVoid: true,
          data: {
            src: reader.result,
          },
        });
        this.props.update(change);
      };
      reader.readAsDataURL(file);
    }
  };

  render() {
    return (
      <span onMouseDown={this.handleClick}>
        图片
        <input
          type="file"
          style={{ width: 0, height: 0, opacity: 0 }}
          ref={this.inputRef}
          onChange={this.handleChange}
        />
      </span>
    );
  }
}

class Editor extends React.Component {
  editorRef = React.createRef();

  handleChange = (v: any) => {
    console.log("change=>>>", v);
    console.log(valueTohtml(v.change.value));
  };

  handleBeforeUpload = (file: any, dataURI: any) => {
    console.log(file, dataURI);
    return dataURI;
  };

  render() {
    return (
      <SlateEditor
        html='<p>asdasd </p><object data="http://vodkgeyttp8.vod.126.net/cloudmusic/b3d1/core/cc53/3ed43d55b6053eee8adea6b93690a434.mp4?wsSecret=451139028541cdc174835e7993506cc2&wsTime=1592394746" ></object>'
        onChange={this.handleChange}
        beforeUpload={this.handleBeforeUpload}
        ref={this.editorRef}
      />
    );
  }
}

ReactDom.render(<Editor />, document.getElementById("root"));
