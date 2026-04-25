import { getCSRFToken } from "../../api/api";
import { CKEditor } from '@ckeditor/ckeditor5-react'; 
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Subscript,
  Superscript,
  Heading,
  Indent,
  IndentBlock,
  List,
  TodoList,
  ListProperties,
  BlockQuote,
  Link,
  CodeBlock,
  Highlight,
  FontSize,
  FontFamily,
  FontColor,
  FontBackgroundColor,
  RemoveFormat,
  Image,
  ImageUpload,
  ImageInsert,
  ImageStyle,
  ImageToolbar,
  ImageCaption,
  ImageResize,
  Table,
  TableToolbar,
  TableProperties,
  TableCellProperties,
  HtmlEmbed,
  SimpleUploadAdapter,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
// import './CKEditorInput.css';

const customColorPalette = [
  { color: 'hsl(4, 90%, 58%)', label: 'Red' },
  { color: 'hsl(340, 82%, 52%)', label: 'Pink' },
  { color: 'hsl(291, 64%, 42%)', label: 'Purple' },
  { color: 'hsl(262, 52%, 47%)', label: 'Deep Purple' },
  { color: 'hsl(231, 48%, 48%)', label: 'Indigo' },
  { color: 'hsl(207, 90%, 54%)', label: 'Blue' },
];


const editorConfig = {
  licenseKey: 'GPL',
  language: 'ru',
  toolbar: {
    items: [
      '|',
      'heading',
      '|',
      'outdent',
      'indent',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'code',
      'subscript',
      'superscript',
      'highlight',
      '|',
      'codeBlock',
      'insertImage',
      'bulletedList',
      'numberedList',
      'todoList',
      '|',
      'blockQuote',
      '|',
      'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      'removeFormat',
      'insertTable',
      '|',
      'htmlEmbed',
      'link',
      'undo',
      'redo',
    ],
    shouldNotGroupWhenFull: true,
  },
  image: {
    toolbar: [
      '|',
      'imageTextAlternative',
      '|',
      'imageStyle:alignLeft',
      'imageStyle:alignRight',
      'imageStyle:alignCenter',
      'imageStyle:side',
      '|',
      'toggleImageCaption',
      '|',
    ],
    styles: ['full', 'side', 'alignLeft', 'alignRight', 'alignCenter'],
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableProperties',
      'tableCellProperties',
      'toggleTableCaption',
    ],
    tableProperties: {
      borderColors: customColorPalette,
      backgroundColors: customColorPalette,
      defaultProperties: {
        width: '100%',
        borderWidth: '1px',
      },
    },
    tableCellProperties: {
      borderColors: customColorPalette,
      backgroundColors: customColorPalette,
      defaultProperties: {
        width: 'auto',
        height: 'auto',
      },
    },
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },
  fontSize: {
    options: [9, 10, 11, 12, 13, 14, 15, 16, 'default', 18, 20, 22, 24, 28, 32, 36],
    supportAllValues: true,
  },
  htmlSupport: {
    allow: [
      { name: 'img', attributes: { class: true, style: true } },
      { name: 'span', attributes: { style: true } },
      { name: 'table', attributes: ['style', 'width', 'height', 'border'] },
      { name: 'td', attributes: ['style', 'width', 'height', 'colspan', 'rowspan'] },
      { name: 'th', attributes: ['style', 'width', 'height', 'colspan', 'rowspan'] },
    ],
  },
  simpleUpload: {
    uploadUrl:
      typeof window !== 'undefined'
        ? new URL('/ckeditor5/image_upload/', window.location.origin).href
        : '',
    headers: {
      'X-CSRFToken': getCSRFToken(),
    },
    withCredentials: true,
  },
  plugins: [
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Code,
    Subscript,
    Superscript,
    Highlight,
    Heading,
    Indent,
    IndentBlock,
    CodeBlock,
    Image,
    ImageUpload,
    ImageInsert,
    ImageStyle,
    ImageToolbar,
    ImageCaption,
    ImageResize,
    List,
    TodoList,
    ListProperties,
    BlockQuote,
    FontSize,
    FontFamily,
    FontColor,
    FontBackgroundColor,
    RemoveFormat,
    Table,
    TableToolbar,
    TableProperties,
    TableCellProperties,
    HtmlEmbed,
    Link,
    SimpleUploadAdapter,
  ],
};


const CKEditorInput = ({ value, onChange }) => {
    return (
      <div className="custom-editor-wrapper">
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          data={value}
          onChange={(event, editor) => {
            const newData = editor.getData();
            onChange(newData);
          }}
        />
      </div>
    )
}

export default CKEditorInput;