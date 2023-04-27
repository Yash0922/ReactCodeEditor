import React from 'react';
import { useState,useRef } from 'react';
import { Editor, EditorState,RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

function Editors(props) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty(),
      );
      const [previousChar, setPreviousChar] = useState('');
      const [previousCharTime, setPreviousCharTime] = useState(0);
      const timeoutRef = useRef(null);

    //   const handleBeforeInput = (chars, editorState) => {
    //     console.log("Enter");
    //     var timeoutID = setTimeout(() => {
    //     if (chars === '*' ) {
    //         console.log("Bold");
           
    //         setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
       
    //         return 'handled';
    //       }
    //     }, 1000);
    //     clearTimeout(timeoutID)
       

    //     if (chars === '*' && editorState.getCurrentContent().getPlainText().endsWith('*'))  {
    //       console.log("Color_red");
          
    //         setEditorState(RichUtils.toggleInlineStyle(editorState, 'RED_COLOR'));
       
       
    //       return 'handled';
    //     }
    
  
          
     
   
    //     return 'not-handled';
    //   };

    const handleBeforeInput = (chars, editorState) => {
        const currentTime = Date.now();
      
        if (previousChar === '*' && chars === '*' && currentTime - previousCharTime < 700) {
          clearTimeout(timeoutRef.current);
          setEditorState(RichUtils.toggleInlineStyle(editorState, 'RED_COLOR'));
          setPreviousChar('');
          return 'handled';
        } else if (previousChar === '' && chars === '*') {
          setPreviousChar('*');
          setPreviousCharTime(currentTime);
          timeoutRef.current = setTimeout(() => {
            setPreviousChar('');
          }, 500);
        } else if (previousChar === '*' && chars !== '*' && currentTime - previousCharTime < 700) {
          setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
          setPreviousChar(chars);
          setPreviousCharTime(currentTime);
          timeoutRef.current = setTimeout(() => {
            setPreviousChar('');
          }, 500);
          return 'handled';
        } else if (previousChar === '*' && chars === '*' && currentTime - previousCharTime < 700) {
            console.log("enter UnderLine")
          setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
          setPreviousChar(chars);
          setPreviousCharTime(currentTime);
          timeoutRef.current = setTimeout(() => {
            setPreviousChar('');
          }, 500);
        //   return 'handled';
        // } else if (previousChar === '*' && chars === '*' && editorState.getCurrentContent().getPlainText().endsWith('**')) {
        //   setEditorState(RichUtils.toggleInlineStyle(editorState, 'RED_COLOR'));
        //   setPreviousChar('');
        //   return 'handled';
        // } else if (previousChar === '**' && chars === '*' && editorState.getCurrentContent().getPlainText().endsWith('*')) {
        //   setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
        //   setPreviousChar('');
        //   return 'handled';
        // } else if (previousChar === '*' && chars === '*' && editorState.getCurrentContent().getPlainText().endsWith('***')) {
        //   setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
        //   setPreviousChar('');
        //   return 'handled';
        } else if (chars === '#' && editorState.getCurrentContent().getPlainText().trim().endsWith(''))  {
          console.log("Enter Heading");
          setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'));
          // Delay for 500ms
          return 'handled';
        }
      
        setPreviousChar(chars);
        setPreviousCharTime(currentTime);
        return 'not-handled';
      };
      
      const customStyleMap = {
        RED_COLOR: {
          color:"red"
        },
        UNDERLINE: {
            textDecoration: 'underline',
          },
      };
      
      const styles = {
        editor: {
            
            marginTop:"10%",
            marginRight:"10%",
            marginLeft:"10%",
          border: '2px solid skyblue ',
          minHeight: '10em',
          padding:"30px"
        }
      };
    return (
        <div style={styles.editor} >
         
      <Editor customStyleMap={customStyleMap}
        editorState={editorState}
        handleBeforeInput={handleBeforeInput}
        onChange={setEditorState}
        
      />
            
        </div>
    );
}

export default Editors;