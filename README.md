# 殷瑞杰 — Robotics Demo Page v2

Corrected after reviewing the supplied videos.

## Demo mapping

### Whole-body control
- Simulation policy switching: one video — Squatting → Walking → Reaching
- Real-robot policy switching: one video — Squatting ↔ Walking
- Reaching simulation: separate video
- Reaching hardware: separate video

### GNN / symmetry / decoupled control
- Box transfer: one simulation video
- Box-carrying left/right turning: one video; blue/yellow points are trajectory visualizations
- Left/right circular turning: one continuous video

## Planned
- GNN vs. MLP symmetry comparison
- real-robot box carrying

Run locally:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
