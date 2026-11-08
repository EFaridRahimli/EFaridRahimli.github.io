// Self-check for src/embed.ts. Run: node scripts/embed-check.ts
import assert from 'node:assert/strict'
import { embed2d, tokenize } from '../src/embed.ts'

assert.deepEqual(tokenize('The YOLOv8 model, for leaves!'), ['yolov8', 'model', 'leaves'])

const docs = [
  'yolo detection tomato leaf disease images',
  'yolo detection tomato leaf disease images',
  'cnn classification grape leaf disease images',
  'spotify music playlist harmonic mixing web app',
]
const p = embed2d(docs)
const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
assert.ok(p.every(([x, y]) => x >= 0 && x <= 1 && y >= 0 && y <= 1), 'coords normalised')
assert.ok(dist(p[0], p[1]) < 1e-6, 'identical docs share a point')
assert.ok(dist(p[0], p[2]) < dist(p[0], p[3]), 'related docs sit closer than unrelated ones')
console.log('embed-check ok')
