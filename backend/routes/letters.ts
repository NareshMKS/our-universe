import { Router } from "express";
import { LoveLetter } from "../models/LoveLetter";

const router = Router();

// GET /api/letters
router.get("/", async (_req, res) => {
  try {
    const letters = await LoveLetter.find().sort({ createdAt: -1 }).lean();

    // Seed your real love story letters if DB is empty
    if (!letters.length) {
      const seeded = await LoveLetter.create([
        {
          title: "The first message",
          body:
            "I still remember the day I texted you for the first time.\n\nThere was no big reason, just a feeling I couldn’t ignore. Before that, I even had a dream — you were already in my life, standing in my home like you belonged there.\n\nSo I sent a simple message: 'Hi Dharshini'… not knowing it would become everything."
        },
        {
          title: "Three words, endless fear",
          body:
            "My feelings kept growing until I couldn’t hold them anymore.\n\nWith fear in my heart and my mind racing, I finally said it — 'I’m sorry… I love you.'\n\nI didn’t know what would happen next, but I knew one thing… it was real."
        },
        {
          title: "The day I broke",
          body:
            "When you said no, it hurt more than I expected.\n\nI tried to stay strong, but I couldn’t. I cried, I overthought, and I tried to move on… but I failed.\n\nBecause no matter how much I tried, I couldn’t stop loving you."
        },
        {
          title: "The moment I tried again",
          body:
            "I came back with a smile, hiding everything behind a playful moment.\n\nI called it a prank… but my heart meant every word. This time, I didn’t want to lose the chance again.\n\nBecause for me, it was never a joke — it was always you."
        },
        {
          title: "The yes that healed everything",
          body:
            "When I asked again, I waited… hoping, overthinking, wishing.\n\nAnd then, you said yes.\n\nIn that moment, everything made sense — the pain, the waiting, the love. It all led to this one answer."
        },
        {
          title: "Us, through everything",
          body:
            "From that moment until now, we’ve lived through so much.\n\nFights, love, tears, laughter, silence, chaos… everything.\n\nIt was never perfect, but it was always real. And through it all, I never stopped choosing you."
        },
        {
          title: "Only you, always",
          body:
            "No matter what happens, no matter where life takes us… I want you beside me.\n\nNot just for now, not just for moments — but for a lifetime.\n\nBecause in the end, it has always been you… and it will always be you.\n\nI love you."
        }
      ]);

      return res.json(seeded);
    }

    return res.json(letters);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to fetch love letters." });
  }
});

export default router;