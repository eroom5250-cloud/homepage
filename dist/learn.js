'use strict';
const catalog=[
 {id:'elementary',name:'초등 · 문장 읽기의 시작',lessons:[
  {id:'e1',name:'주어와 동사 찾기',sentence:'I read a book.',meaning:'나는 책을 읽습니다.',explain:'I는 누가 읽는지를, read는 무엇을 하는지를 나타냅니다. a book은 읽는 대상입니다.',question:'이 문장에서 행동을 나타내는 동사는?',options:['I','read','a book'],answer:1,reason:'read가 읽는다는 행동을 나타내는 동사입니다.'},
  {id:'e2',name:'나의 문장으로 바꾸기',sentence:'She likes music.',meaning:'그녀는 음악을 좋아합니다.',explain:'주어가 she이고 현재의 습관이나 취향을 말할 때 일반동사 like에 -s를 붙입니다.',question:'주어를 I로 바꾸면 알맞은 문장은?',options:['I likes music.','I liking music.','I like music.'],answer:2,reason:'주어가 I일 때 현재형 일반동사는 like를 사용합니다.'}]},
 {id:'middle',name:'중등 · 문장 구조 연결',lessons:[
  {id:'m1',name:'수식어와 중심 구조',sentence:'The boy who lives next door plays soccer.',meaning:'옆집에 사는 그 소년은 축구를 합니다.',explain:'who lives next door는 The boy를 설명합니다. 중심 구조는 The boy plays soccer입니다.',question:'문장 전체의 중심 동사는?',options:['lives','plays','door'],answer:1,reason:'lives는 관계절 안의 동사이고, 문장 전체의 주어 The boy에 연결되는 중심 동사는 plays입니다.'},
  {id:'m2',name:'이유를 연결하는 문장',sentence:'I stayed home because it was raining.',meaning:'비가 오고 있었기 때문에 나는 집에 머물렀습니다.',explain:'because 뒤의 절은 앞의 행동에 대한 이유를 설명합니다. 두 절의 관계를 함께 읽어야 합니다.',question:'because 뒤의 절이 나타내는 것은?',options:['결과','반대','이유'],answer:2,reason:'because it was raining은 집에 머문 이유를 나타냅니다.'}]},
 {id:'high',name:'고등 · 근거를 읽는 독해',lessons:[
  {id:'h1',name:'긴 문장의 중심 찾기',sentence:'The ability to explain what you have learned helps you remember it.',meaning:'배운 것을 설명하는 능력은 그것을 기억하는 데 도움을 줍니다.',explain:'주어의 중심은 The ability, 중심 동사는 helps입니다. to explain what you have learned는 어떤 능력인지를 구체화합니다.',question:'문장 전체에서 주어의 중심 명사는?',options:['ability','you','learned'],answer:0,reason:'The ability가 주어의 중심이고 to explain 이하가 그 능력을 설명합니다.'},
  {id:'h2',name:'대조의 논리 읽기',sentence:'Practice takes time. However, it builds lasting confidence.',meaning:'연습에는 시간이 걸립니다. 하지만 연습은 오래가는 자신감을 만듭니다.',explain:'However는 앞 문장의 부담과 뒤 문장의 장점을 대조합니다. it은 앞 문장의 Practice를 가리킵니다.',question:'두 문장의 논리 관계는?',options:['예시','대조','시간 순서'],answer:1,reason:'However를 통해 시간이 든다는 부담과 자신감을 만든다는 장점이 대조됩니다.'}]}
];
const key='all-in-one-learning-v1';let state={done:[],notes:{}},course=0,lesson=0,storageOK=true;
const allIds=catalog.flatMap(c=>c.lessons.map(l=>l.id));
try{const raw=JSON.parse(localStorage.getItem(key)||'null');if(raw&&Array.isArray(raw.done)&&raw.notes&&typeof raw.notes==='object'){state.done=[...new Set(raw.done.filter(id=>allIds.includes(id)))];for(const id of allIds)if(typeof raw.notes[id]==='string')state.notes[id]=raw.notes[id].slice(0,10000)}}catch(e){storageOK=false}
const $=id=>document.getElementById(id);
function save(){try{localStorage.setItem(key,JSON.stringify(state));storageOK=true;return true}catch(e){storageOK=false;$('status').textContent='브라우저 저장을 사용할 수 없습니다. 기록 다운로드로 보관해 주세요.';return false}}
function current(){return catalog[course].lessons[lesson]}
function renderNavigation(){
 $('courses').replaceChildren();catalog.forEach((c,i)=>{const b=document.createElement('button');b.textContent=c.name;b.setAttribute('aria-current',String(i===course));b.onclick=()=>{course=i;lesson=0;render()};$('courses').append(b)});
 $('progress-label').textContent='전체 '+state.done.length+' / 6 수업 완료';$('progress').value=state.done.length;
 $('lessons').replaceChildren();catalog[course].lessons.forEach((l,i)=>{const b=document.createElement('button');b.textContent=(state.done.includes(l.id)?'✓ 완료 · ':'')+l.name;b.setAttribute('aria-current',String(i===lesson));b.onclick=()=>{lesson=i;render()};$('lessons').append(b)});
}
function render(){renderNavigation();const l=current();$('lesson').innerHTML='<small id="course-name"></small><h2 id="lesson-name"></h2><div class="sentence" lang="en" id="sentence"></div><p id="meaning"></p><h3>문장 속 구조</h3><p id="explanation"></p><h3><label for="note">나의 말로 설명하기</label></h3><p>어떤 구조로 읽었는지, 왜 그렇게 읽었는지 적어보세요.</p><textarea id="note" maxlength="10000" placeholder="주어는…, 동사는…"></textarea><small>메모는 입력할 때 자동 저장됩니다.</small><form id="quiz"><fieldset id="answers"><legend id="question"></legend></fieldset><button class="primary" type="submit">답 확인하기</button></form><div id="feedback" class="feedback hidden" role="status"></div><div class="actions"><button id="complete" class="primary" disabled>정답 확인 후 수업 완료</button><button id="next">다음 수업</button></div>';
 $('course-name').textContent=catalog[course].name;$('lesson-name').textContent=l.name;$('sentence').textContent=l.sentence;$('meaning').textContent=l.meaning;$('explanation').textContent=l.explain;$('question').textContent=l.question;$('note').value=state.notes[l.id]||'';
 $('note').oninput=()=>{state.notes[l.id]=$('note').value;save()};
 l.options.forEach((text,i)=>{const label=document.createElement('label');label.className='answer';const input=document.createElement('input');input.type='radio';input.name='answer';input.value=i;input.required=true;input.onchange=()=>{$('complete').disabled=true};label.append(input,document.createTextNode(' '+text));$('answers').append(label)});
 $('quiz').onsubmit=e=>{e.preventDefault();const selected=$('quiz').querySelector('input:checked');if(!selected)return;const correct=Number(selected.value)===l.answer;$('feedback').classList.remove('hidden');$('feedback').textContent=(correct?'정답입니다. ':'다시 읽어보세요. ')+l.reason;$('complete').disabled=!correct};
 $('complete').onclick=()=>{if(!state.done.includes(l.id))state.done.push(l.id);const saved=save();renderNavigation();$('complete').textContent='수업 완료 ✓';$('complete').disabled=true;$('status').textContent=saved?'진도가 이 브라우저에 저장되었습니다.':'이 브라우저에서는 저장할 수 없습니다. 기록을 다운로드해 주세요.'};
 $('next').onclick=()=>{if(lesson<1)lesson++;else if(course<2){course++;lesson=0}else{course=0;lesson=0}render();$('lesson-name').scrollIntoView({block:'start',behavior:'smooth'})};
 if(state.done.includes(l.id))$('complete').textContent='완료한 수업 · 다시 풀어보기';
}
$('export').onclick=()=>{const record={exportedAt:new Date().toISOString(),completed:state.done,notes:state.notes,lessons:catalog.flatMap(c=>c.lessons.map(l=>({id:l.id,name:l.name,course:c.name})))};const url=URL.createObjectURL(new Blob([JSON.stringify(record,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='all-in-one-learning.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
$('reset').onclick=()=>{if(!confirm('이 브라우저에 저장된 모든 진도와 메모를 삭제할까요?'))return;state={done:[],notes:{}};const saved=save();render();$('status').textContent=saved?'학습 기록을 초기화했습니다.':'화면 기록을 초기화했습니다. 브라우저 저장에는 접근할 수 없습니다.'};
render();if(!storageOK)$('status').textContent='이 브라우저에서 저장된 기록을 읽지 못했습니다. 기록 다운로드를 이용해 주세요.';
