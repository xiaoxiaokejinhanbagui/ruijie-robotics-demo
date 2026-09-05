(function(){
  function makeCard(src){
    const a=document.createElement('article');
    a.className='video-card';
    a.innerHTML='<div class="video-shell"><video autoplay muted loop playsinline preload="metadata"><source src="'+src+'" type="video/mp4"></video></div><div class="video-label-block"><strong></strong><span></span></div>';
    return a;
  }
  function buildComparison(demo,gnnSrc,mlpSrc){
    if(!demo)return;
    const old=demo.querySelector('.feature-video,.comparison-grid');
    const grid=document.createElement('div');
    grid.className='video-grid two-feature comparison-grid';
    grid.appendChild(makeCard(gnnSrc));
    grid.appendChild(makeCard(mlpSrc));
    if(old)old.replaceWith(grid);else demo.appendChild(grid);
  }
  function setComparisonLabels(lang){
    const demos=[...(RY.refs?.dc?.querySelectorAll('.demo-block')||[])];
    const zh=lang!=='en';
    const labels3=demos[2]?.querySelectorAll('.video-label-block')||[];
    const labels4=demos[3]?.querySelectorAll('.video-label-block')||[];
    if(labels3[0]){labels3[0].querySelector('strong').textContent=zh?'本文方法（GNN）':'Our Method (GNN)';labels3[0].querySelector('span').textContent=zh?'左右对称性良好':'Strong left–right symmetry';}
    if(labels3[1]){labels3[1].querySelector('strong').textContent=zh?'传统 MLP':'Conventional MLP';labels3[1].querySelector('span').textContent=zh?'左右对称性较差':'Weaker left–right symmetry';}
    if(labels4[0]){labels4[0].querySelector('strong').textContent=zh?'本文方法（GNN）':'Our Method (GNN)';labels4[0].querySelector('span').textContent=zh?'Left：训练动作 · Right：OOD':'Left: Training · Right: OOD';}
    if(labels4[1]){labels4[1].querySelector('strong').textContent=zh?'传统 MLP':'Conventional MLP';labels4[1].querySelector('span').textContent=zh?'Left：训练动作 · Right：OOD':'Left: Training · Right: OOD';}
  }
  function buildHumanCollaboration(){
    const wb=document.getElementById('whole-body-detail');
    if(!wb||document.getElementById('human-collaboration-detail'))return;
    const s=document.createElement('section');
    s.className='section detail-section';
    s.id='human-collaboration-detail';
    s.innerHTML='<div class="container"><div class="detail-heading"><span class="detail-kicker">项目 02</span><h2>人机协作任务执行</h2><p>面向人机协作搬运场景，展示人形机器人在真实环境中与人协同完成箱体搬运与任务执行。</p></div><div class="demo-block human-collaboration-demo"><div class="demo-header"><div><span class="demo-index">01</span><h3>人机协作搬箱</h3></div><p>真机 · 人机协同箱体搬运任务</p></div><article class="video-card feature-video"><div class="video-shell feature-shell"><video class="human-collaboration-video" autoplay muted loop playsinline preload="metadata"></video></div><div class="video-label-block"><strong>真机实验</strong><span>人机协作任务执行</span></div></article></div></div>';
    wb.parentElement.insertBefore(s,wb);
  }
  function setHumanCollaborationLabels(lang){
    const s=document.getElementById('human-collaboration-detail');
    if(!s)return;
    const zh=lang!=='en';
    const q=(sel)=>s.querySelector(sel);
    q('.detail-kicker').textContent=zh?'项目 02':'PROJECT 02';
    q('.detail-heading h2').textContent=zh?'人机协作任务执行':'Human–Robot Collaborative Task Execution';
    q('.detail-heading p').textContent=zh?'面向人机协作搬运场景，展示人形机器人在真实环境中与人协同完成箱体搬运与任务执行。':'Real-robot demonstration of a humanoid collaborating with a human partner to carry and execute a box-handling task.';
    q('.demo-header h3').textContent=zh?'人机协作搬箱':'Human–Robot Collaborative Box Carrying';
    q('.demo-header p').textContent=zh?'真机 · 人机协同箱体搬运任务':'Real robot · Collaborative box-carrying task';
    q('.video-label-block strong').textContent=zh?'真机实验':'Real Robot';
    q('.video-label-block span').textContent=zh?'人机协作任务执行':'Human–robot collaborative task execution';
    const wb=document.getElementById('whole-body-detail');
    if(wb){const k=wb.querySelector('.detail-kicker');if(k)k.textContent=zh?'项目 03':'PROJECT 03';}
  }
  async function loadHumanCollaborationVideo(){
    const v=document.querySelector('.human-collaboration-video');
    if(!v||v.dataset.loaded==='1')return;
    v.dataset.loaded='1';
    const files=['assets/videos/human_collaboration/embedded/human-collaboration-task-00.b64','assets/videos/human_collaboration/embedded/human-collaboration-task-01.b64'];
    try{
      const parts=await Promise.all(files.map(x=>fetch(x).then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.text();})));
      const s=parts.join('').replace(/\s+/g,'');
      const raw=atob(s), bytes=new Uint8Array(raw.length);
      for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
      v.src=URL.createObjectURL(new Blob([bytes],{type:'video/mp4'}));
      v.load();
      v.play().catch(()=>{});
    }catch(e){console.error('Failed to load human collaboration video',e);}
  }
  function init(){
    RY.setup();
    buildHumanCollaboration();
    if(RY.copy?.zh){
      RY.copy.zh.d3=['左右对称性对照实验','在相同的左右行走任务下，对比本文方法（GNN）与传统 MLP。本文方法能够保持更一致的左右镜像运动，而 MLP 基线表现出更明显的非对称性，用于验证策略结构对左右对称性的保持能力。','本文方法（GNN）','左右对称性良好'];
      RY.copy.zh.d4=['箱体转向的分布外（OOD）泛化对照实验','两种策略均以左转箱体搬运动作为训练分布，右转作为镜像方向的分布外（OOD）动作。通过对比本文方法（GNN）与传统 MLP 在右转任务上的表现，评估策略对未见转向方向的泛化能力。','本文方法（GNN）','Left：训练动作 · Right：OOD'];
    }
    if(RY.copy?.en){
      RY.copy.en.d3=['Left–Right Symmetry Comparison','Under the same left/right walking task, our GNN-based policy is compared with a conventional MLP baseline. The proposed method preserves more consistent mirrored motion, whereas the MLP baseline exhibits visibly weaker symmetry.','Our Method (GNN)','Strong left–right symmetry'];
      RY.copy.en.d4=['OOD Generalization in Box Turning: GNN vs. MLP','Both policies are trained on left-turn box-carrying motions, while right turning is treated as a mirrored out-of-distribution (OOD) motion. Comparing the GNN policy with the conventional MLP baseline evaluates generalization to the unseen turning direction.','Our Method (GNN)','Left: Training · Right: OOD'];
    }
    const demos=[...(RY.refs?.dc?.querySelectorAll('.demo-block')||[])];
    buildComparison(demos[2],'assets/videos/gnn_symmetry/turning-symmetry.mp4?v=20260818-gnn','assets/videos/gnn_symmetry/left-right-turn-ood.mp4?v=20260818-mlp');
    buildComparison(demos[3],'assets/videos/gnn_symmetry/box-turn-symmetry.mp4?v=20260818-gnn','assets/videos/gnn_symmetry/turn-in-place-symmetry.mp4?v=20260818-mlp');
    RY.setupVideos();
    loadHumanCollaborationVideo();
    const apply=(lang)=>{RY.applyLanguage(lang);setComparisonLabels(lang);setHumanCollaborationLabels(lang);};
    document.querySelectorAll('.language-switch button').forEach(b=>b.addEventListener('click',()=>apply(b.dataset.lang)));
    apply('zh');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
