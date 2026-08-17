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
  function init(){
    RY.setup();
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
    const apply=(lang)=>{RY.applyLanguage(lang);setComparisonLabels(lang);};
    document.querySelectorAll('.language-switch button').forEach(b=>b.addEventListener('click',()=>apply(b.dataset.lang)));
    apply('zh');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
