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
  const [size, setSize] = useState(15);
  const [index, setIndex] = useState(0);
  const texts = useSelector(selectTexts);
  const [sizes, setSizes] = useState([]);
  const [node, setNode] = useState(null);
  const [range, setRange] = useState(null);
  const [parent, setParent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getTexts()).then(e => setLoading(false));
  }, []);

  useEffect(() => {
    let data = [];
    for (let i = 1; i <= 40; i++) {
      data.push(i);
    }
    setSizes(data);
  }, []);

  useDeepCompareEffect(() => {
    // dispatch(getTodos(routeParams));
  }, [dispatch, routeParams]);

  function replaceSelectedText(tag = null, fontSize = '') {
    if (node) {
      if (tag == "size") {
        node.style.fontSize = `${fontSize}px`;
      }
      else if (tag == 'bold') {
        node.style.fontWeight = "bold";
      }
      else if (!tag) {
        node.style.fontWeight = "normal";
      }
  
      range.deleteContents();
      range.insertNode(node);
    } else if (parent) {
      if (tag == "size") {
        parent.style.fontSize = `${fontSize}px`;
      }
      else if (tag == 'bold') {
        parent.style.fontWeight = "bold";
      }
      else if (!tag) {
        parent.style.fontWeight = "normal";
      }
    }
  }

  const getRange = () => {
    let sel, range, element, text;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            text = document.createTextNode(range.toString());
            let parent = range.commonAncestorContainer.parentNode;

            element = document.createElement("span");
            element.appendChild(text);
            setRange(range);
            
            if (parent.tagName.toLowerCase() == "span") {
              setNode(null);
              setParent(parent);
            } else {
              setParent(null);
              setNode(element);
            }
        }
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
              <button class="item" onClick={() => replaceSelectedText("bold")}>Negrita</button>
              <button class="item" onClick={() => replaceSelectedText()}>Normal</button>
              <select class="select-font-size" onChange={e => {
                replaceSelectedText("size", e.target?.value);
              }}>
                {sizes.map(value => {
                  return (
                    <option value={value}>{value}</option>
                  );
                })}
              </select>
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
            onMouseUp={e => {
              getRange();
            }}
            dangerouslySetInnerHTML={{__html: texts.length > 0 ? texts[index]?.en_text : ''}}
          >
          </div>
        </div>
        
        <div class="container-editor">
          <div class="editor-header">
            <h1 class="editor-title">Español</h1>
            <div class="header-container-button">
              <button class="item" onClick={() => replaceSelectedText("bold")}>Negrita</button>
              <button class="item" onClick={() => replaceSelectedText()}>Normal</button>
              <select class="select-font-size" onChange={e => {
                replaceSelectedText("size", e.target?.value);
              }}>
                {sizes.map(value => {
                  return (
                    <option value={value}>{value}</option>
                  );
                })}
              </select>
            </div>
          </div>

          {/*spellCheck se desabilita para que no este corrigiendo la ortografia*/}
          <div 
            ref={editorEsRef} 
            spellCheck={false} 
            class="editor-body" 
            id="apurva-editor-es"
            contentEditable={true}
            onMouseUp={e => {
              getRange();
            }}
            dangerouslySetInnerHTML={{__html: texts.length > 0 ? texts[index]?.es_text : ''}}
          >
          </div>
        </div>
      </div>

    </div>
  );
}

export default Textos;
