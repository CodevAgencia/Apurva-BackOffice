import "./Textos.css";
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { getTexts, selectTexts } from '../../store/app/textosSlice';

function Textos(props) {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const routeParams = useParams();
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
        console.log("estamos en el else");
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
              //editorRef.current.innerHTML = "Hola soy el texto por defecto en el div <h1>yeah!</h1> que mas sigue XD XD";
            }}
            className={index == i ? "text-button-item-active" : "text-button-item"}
          >
            {text?.name}
          </button>
        );
      })}

      <div class="container-editor">
        <div class="editor-header">
          <button class="item" onClick={() => replaceSelectedText("strong")}>Negrita</button>
          <button class="item" onClick={() => replaceSelectedText("h1")}>Título</button>
          <button class="item" onClick={() => replaceSelectedText()}>Normal</button>
        </div>

        {/*spellCheck se desabilita para que no este corrigiendo la ortografia*/}
        <div class="editor-body" spellCheck={false} ref={editorRef} contentEditable={true} id="apurva-editor">
          Objective: <br/>
          This module is designed to enhance your body awareness and relaxation techniques,
          especially during moments of high excitement. The aim is to help you understand
          and moderate your body's natural responses, contributing to overall relaxation and
          endurance. <br/>

          Body Awareness & Relaxation: <br/>
          Many individuals unconsciously tense various muscles, like the buttocks, feet, legs,
          abdominals, and jaw, during heightened states of excitement. Additionally,
          breathing patterns can become irregular. Recognizing these signs and learning to
          relax them is key to maintaining a calm and focused state. <br/>

          Approaching the Point of No Return: <br/>
          - Understanding Your Body: Learn to recognize your body's signals as you approach
          the 'point of no return.' Your goal is to acknowledge this peak of excitement and
          employ relaxation techniques to maintain control and balance.
          - App Usage: When nearing the 'point of no return' during a session, pause the
          exercise. Stop any stimulation and allow your excitement level to decrease. Once
          you feel more balanced, you can start a new round at your own pace. <br/>

          Techniques for Relaxation: <br/>
          - Scan & Relax: Become aware of your body's responses. If you notice tension, like
          clenching your jaw, consciously relax it. This applies to any tense muscles. This skill is
          crucial for improving your endurance.
          - Deep Breathing: Implement deep, full breaths to maintain a state of relaxation,
          especially if you tend to hold your breath or have shallow breathing. <br/>

          Practice Guidance: <br/>
          1 <br/>

          - Preparation: Use a suitable lubricant for comfort during your practice.
          - Whole Area Attention: Gently massage the entire area, focusing on relaxation and
          awareness. <br/>
          - Focused Attention: Always stay very present with the exercise, paying attention to
          your body's signals.
          - Mindfulness: Stay aware of your relaxation levels throughout the practice.
          - Technique Application: Utilize deep breathing, muscle relaxation, and other
          techniques to maintain a relaxed state.
          - Monitoring and Adjusting: Continuously assess where you stand in terms of
          excitement and use the app's features to guide your practice. If you feel overly
          excited, stop the round, breathe deeply, refocus on relaxation, and start a new one
          when you are ready. <br/>

          The Analogy: <br/>
          Think of managing your body's responses like piloting a spacecraft: each system
          (body response) has a control (relaxation technique). Just as a pilot must be aware of
          and adjust various controls to ensure a smooth flight, you need to manage different
          body responses to maintain control and enjoy the experience, rather than rushing to
          the destination. <br/>

          Approach: <br/>
          Embrace this practice as an opportunity for mindfulness and a deeper connection
          with your body. By mastering these techniques, you not only enhance your physical
          well-being but also contribute to your mental and emotional health. This holistic
          practice leads to a more harmonious and fulfilling life experience, positively
          impacting both personal satisfaction and interpersonal relationships.
        </div>
      </div>
    </div>
  );
}

export default Textos;
