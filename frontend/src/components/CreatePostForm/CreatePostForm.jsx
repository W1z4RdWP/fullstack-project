import { useState } from "react";
import { getCSRFToken } from "../../api/api";
import { createPost } from "../../api/api";
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
import './CreatePostForm.css';

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




const CreatePostForm = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Собираем данные формы
        const formData = {
            title: title.trim(),
            content: content.trim()
        };

        if (!formData.title || !formData.content) {
            setError('Заполните все поля');
            setLoading(false);
            return;
        }

        try {
            const result = createPost(formData);
            
            // Очищаем форму после успеха
            setTitle('');
            setContent('');
        } catch (err) {
            setError(err.message || 'Ошибка при создании поста');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-post-form">
            <form onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="title">Заголовок</label><br />
                <input 
                    className="create-post-from__input"
                    type="text" 
                    id="title"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                    placeholder="Введите заголовок поста" 
                /> <br /><br />
                <label htmlFor="content">Содержание</label>
              <CKEditor
                    editor={ClassicEditor}
                    config={editorConfig}
                    data={content}
                    onChange={(event, editor) => setContent(editor.getData())}
                />

                {error && <div className="error" style={{color: 'red'}}>{error}</div>}
                
                <button type="submit">
                    {loading ? 'Создание...' : 'Создать'}
                </button>
            </form>
        </div>
    );
};

export default CreatePostForm;