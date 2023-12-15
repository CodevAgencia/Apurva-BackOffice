import "./Textos.css";
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { getTexts, updateText, selectTexts } from '../../store/app/textosSlice';

function Textos(props) {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const editorEnRef = useRef(null);
  const editorEsRef = useRef(null);
  const [index, setIndex] = useState(0);
  const texts = useSelector(selectTexts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getTexts()).then(e => setLoading(false));
  }, []);

  useDeepCompareEffect(() => {
    // dispatch(getTodos(routeParams));
  }, [dispatch, routeParams]);

  function replaceSelectedText(tag = null) {
    let sel, range, element, text;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            text = document.createTextNode(range.toString());
            let parent = range.commonAncestorContainer.parentNode;
            
            if (tag == 'h1') {
              element = document.createElement("h1");
              element.appendChild(text);
              element.classList.add("text-title");
              //element = new DOMParser().parseFromString(openLabel + range.toString() + closeLabel, "text/xml");
            } else if (tag == 'strong') {
              element = document.createElement("strong");
              element.appendChild(text);
              element.classList.add("text-bold");
            }

            if (parent.tagName.toLowerCase() == "h1" || parent.tagName.toLowerCase() == "strong")
              parent.remove();

            range.deleteContents();
            
            if (tag)
              range.insertNode(element/*element.firstChild*/);
            else
              range.insertNode(text);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.innerHTML = replacementText;
    }
  }

  if (loading)
    return <FuseLoading />;

  return (
    <div class="main">
      {texts.map((text, i) => {
        return (
          <button 
            key={i}
            onClick={() => {
              setIndex(i);
            }}
            className={index == i ? "text-button-item-active" : "text-button-item"}
          >
            {text?.name}
          </button>
        );
      })}

      <div class="container-editors">
        <div class="container-editor">
          <div class="editor-header">
            <h1 class="editor-title">Ingles</h1>
            <div class="header-container-button">
              <button class="item" onClick={() => replaceSelectedText("strong")}>Negrita</button>
              <button class="item" onClick={() => replaceSelectedText("h1")}>Título</button>
              <button class="item" onClick={() => replaceSelectedText()}>Normal</button>
            </div>
          </div>

          <div class="save-button-container">
            <button onClick={() => {
              const item = texts[index];
              dispatch(updateText({
                "id": item?.id,
                "en_text": editorEnRef.current.innerHTML,
                "es_text": editorEsRef.current.innerHTML
              }));
            }}>Guardar</button>
          </div>

          {/*spellCheck se desabilita para que no este corrigiendo la ortografia*/}
          <div 
            ref={editorEnRef} 
            spellCheck={false} 
            class="editor-body" 
            id="apurva-editor-en" 
            contentEditable={true} 
            dangerouslySetInnerHTML={{__html: texts.length > 0 ? texts[index]?.en_text : ''}}
          >
          </div>
        </div>
        
        <div class="container-editor">
          <div class="editor-header">
            <h1 class="editor-title">Español</h1>
            <div class="header-container-button">
              <button class="item" onClick={() => replaceSelectedText("strong")}>Negrita</button>
              <button class="item" onClick={() => replaceSelectedText("h1")}>Título</button>
              <button class="item" onClick={() => replaceSelectedText()}>Normal</button>
            </div>
          </div>

          {/*spellCheck se desabilita para que no este corrigiendo la ortografia*/}
          <div 
            ref={editorEsRef} 
            spellCheck={false} 
            class="editor-body" 
            id="apurva-editor-es"
            contentEditable={true}
            dangerouslySetInnerHTML={{__html: texts.length > 0 ? texts[index]?.es_text : ''}}
          >
          </div>
        </div>
      </div>

    </div>
  );
}

export default Textos;
