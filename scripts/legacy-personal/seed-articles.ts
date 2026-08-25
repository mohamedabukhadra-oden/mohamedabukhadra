import { db } from '../src/lib/db'

export const articles = [
  {
    title: 'Are We Ready for a Dog? The Question Every Family Should Ask First',
    slug: 'are-we-ready-for-a-dog',
    excerpt: 'Before falling in love with the puppy at the breeder, ask the question that most families skip: can this house actually carry a dog?',
    category: 'family-systems',
    tags: 'are we ready for a dog, getting a dog, family readiness, puppy preparation',
    status: 'PUBLISHED',
    featured: true,
    metaDescription: 'Are we ready for a dog? The honest question every family should ask before bringing a puppy home.',
    content: '## The Question Nobody Asks\n\nMost families decide to get a dog the same way: the children ask, the parents cave, and everyone falls in love with a puppy at the breeder.\n\nThen reality arrives.\n\nThe question isn\'t whether your family loves dogs. The question is: **can your family carry one?**\n\n## What "Ready" Actually Means\n\nBeing ready for a dog isn\'t about having a big house or a garden. It\'s about whether the family system can absorb a dependent, high-needs creature for the next 10-15 years.\n\n### 1. Who Actually Owns the Responsibility?\n\nNot "who will help." Who owns it when nobody else steps up?\n\n### 2. What Will the Kids Really Do?\n\nChildren want to play with the puppy. They don\'t want to clean up accidents at 6 AM.\n\nPlaying with the puppy is not the same as caring for the puppy.\n\n### 3. How Much Daily Work Can the Family Realistically Carry?\n\nA puppy needs 3-5 hours of active work per day. Who in your family has that time?\n\n### 4. Is the House Prepared?\n\nPuppy zones, barriers, safe spaces, hazards removed.\n\n### 5. Can Mum Have Space and Control?\n\n**Mum gets space. Puppy gets control.** That\'s the rule.\n\n## The Family Readiness Test\n\nThe test looks at: Workload, Roles, Commitment, Safety, Family comfort, and Realistic routines.\n\nThe result: PASS, PAUSE, or NOT READY.\n\nThere is no shame in waiting. Sometimes waiting is the responsible decision.\n\n## Don\'t Buy the Puppy Yet\n\nBefore you fall in love with the puppy at the breeder, find out whether your family is ready for the reality.\n\nBecause the goal isn\'t just to bring the puppy home. **The goal is to keep him.**\n\nSystem first. Puppy second. Family always.',
  },
  {
    title: 'What Nobody Tells You About the First Week With a Puppy',
    slug: 'first-week-with-a-puppy',
    excerpt: 'The first seven days will test your family more than any training book warned you. Here\'s what actually happens.',
    category: 'family-systems',
    tags: 'first week puppy, bringing home a puppy, puppy preparation, puppy overwhelm',
    status: 'PUBLISHED',
    featured: false,
    metaDescription: 'What nobody tells you about the first week with a puppy. The crying, the accidents, the sleep deprivation.',
    content: '## The First Night\n\nThe first night is the hardest. Your puppy has been taken from everything he knows. He will cry. He will whine.\n\nThe real question is: **who is getting up to comfort the puppy, and is that person prepared for a week of broken sleep?**\n\n## Days 1-3: The Honeymoon Crash\n\nPuppies pee every 30-60 minutes when awake. By day three, the excitement is fading.\n\n## Days 4-7: The Reality Check\n\nBy day four, the children have moved on. The puppy still needs 3-5 hours of care per day.\n\n### What "Holding" Looks Like\n\n- Dad owns the system\n- Kids have clear, age-appropriate jobs\n- Mum has space\n- The routine is written down\n\n### What "Breaking" Looks Like\n\n- Nobody knows whose turn it is\n- Mum is doing everything\n- The children have lost interest\n- Someone says: "I can\'t do this anymore."\n\n## How to Prepare\n\n1. Set up puppy zones before arrival\n2. Assign roles — write them down\n3. Plan the potty schedule\n4. Prepare for crying\n5. Talk to the kids about their actual jobs\n\n**The best time to build the family system is before the puppy comes home.**\n\nSystem first. Puppy second. Family always.',
  },
  {
    title: 'How Much Work Is a Puppy Really? The Honest Answer',
    slug: 'how-much-work-is-a-puppy',
    excerpt: 'Dog books talk about "commitment." Here\'s what that actually means in hours, tasks, and daily reality.',
    category: 'family-systems',
    tags: 'puppy workload, puppy responsibility, how much work is a puppy, dog ownership responsibilities',
    status: 'PUBLISHED',
    featured: false,
    metaDescription: 'How much work is a puppy really? The honest breakdown of daily hours and tasks by age.',
    content: '## The Number Nobody Tells You\n\nA puppy in the first three months requires **3-5 hours of active work per day**.\n\n## The Daily Breakdown (8-16 Weeks)\n\n- Morning routine: 45-60 minutes\n- Mid-morning: 30 minutes\n- Lunch: 20 minutes\n- Afternoon: 45 minutes\n- Evening: 60 minutes\n- Night: 30 minutes\n- Daily cleaning: 15 minutes\n\n**Total: 3.5-5 hours per day**\n\n## What Changes Over Time\n\n- 3-6 months: 2.5-4 hours/day\n- 6-12 months: 2-3 hours/day\n- 1-2 years: 1.5-2.5 hours/day\n- 2+ years: 1-2 hours/day\n\n## The Real Question\n\nDoes your family\'s current schedule have 3-5 spare hours per day?\n\nIf yes, you might be ready. If no, you need to decide what you\'re going to give up.\n\n## Who Carries the Work?\n\nIn households where the work is shared — Dad owns the system, kids have clear jobs, Mum gets space — the puppy is manageable.\n\nIn households where the work defaults to one person, the puppy becomes a source of resentment.\n\n**Because the goal isn\'t just to bring the puppy home. The goal is to keep him.**\n\nSystem first. Puppy second. Family always.',
  },
  {
    title: 'What Should Kids Actually Do With a Puppy? The Operator System',
    slug: 'what-should-kids-do-with-a-puppy',
    excerpt: 'Children don\'t need to do everything. They need to know exactly what their job is.',
    category: 'family-systems',
    tags: 'puppy responsibilities for kids, kids and puppies, preparing children for a new puppy',
    status: 'PUBLISHED',
    featured: false,
    metaDescription: 'What should kids actually do with a puppy? Age-appropriate roles and the Kids Operator System.',
    content: '## The Problem With "Helping"\n\n"Helping" means different things to different people. To a child, it might mean playing for 10 minutes. To a parent, it might mean taking the puppy out at 6 AM.\n\n## The Operator System\n\nChildren aren\'t "helpers." They\'re **operators**. An operator has:\n- A clearly defined job\n- A specific time to do it\n- A way to know when it\'s done\n- Accountability\n\n## Age-Appropriate Roles\n\n### Ages 3-5: The Observer\n- Help pour food (with supervision)\n- Tell Daddy when the puppy is at the door\n- Help pick up toys\n\n### Ages 6-8: The Assistant\n- Fill the water bowl twice daily\n- Bring the leash before walks\n- Put away toys at bedtime\n\n### Ages 9-12: The Operator\n- Feed at set times\n- Take puppy to potty area\n- Brush the puppy daily\n\n### Ages 13+: The Co-Manager\n- Walk the puppy\n- Clean up accidents\n- Do training sessions\n\n## What Kids Should NOT Do\n\n- Decide when the puppy eats\n- Discipline the puppy\n- Be solely responsible for potty training\n- Make veterinary decisions\n\n## The Key Principle\n\n> Playing with the puppy is not the same as caring for the puppy.\n\nJobs are non-negotiable. Play is what happens after the jobs are done.\n\nSystem first. Puppy second. Family always.',
  },
  {
    title: 'What Happens When the Kids Lose Interest in the Dog?',
    slug: 'when-kids-lose-interest-in-the-dog',
    excerpt: 'It always happens. The excitement fades, and the dog becomes someone else\'s problem. Here\'s how to prevent it.',
    category: 'family-systems',
    tags: 'kids lose interest, puppy and kids, family dog problems, dog ownership responsibilities',
    status: 'PUBLISHED',
    featured: false,
    metaDescription: 'What happens when the kids lose interest in the dog? Why it happens and the family system that prevents it.',
    content: '## It Will Happen\n\nEvery parent who has bought a dog for their children has experienced this moment: the children who begged for the puppy, who promised to walk it every day. Three weeks later, they\'ve lost interest.\n\n## Why It Happens\n\nChildren are wired for novelty. The problem isn\'t that children lose interest. The problem is that **most families don\'t have a system to handle it.**\n\n## The Default Outcome\n\n1. Week 1-2: Everyone is excited\n2. Week 3: Kids start to lose interest\n3. Week 4: Kids resist reminders\n4. Week 5-6: One parent takes over everything\n5. Month 3: The dog is "her problem"\n6. Month 6: The family is considering rehoming\n\n## How to Prevent It\n\n1. **Don\'t build on excitement** — build on roles and routines\n2. **Make jobs specific** — "Fill the water bowl at 7 AM" not "help with the dog"\n3. **Separate play from work** — play comes after jobs\n4. **Dad owns the system** — he checks that jobs are done\n5. **Review monthly** — adjust roles as kids grow\n\n## What If It\'s Already Happened?\n\nCall a family meeting. Reassign roles. Dad takes ownership. Write it down. Be consistent.\n\n**The system is what keeps the dog cared for. Not excitement.**\n\nSystem first. Puppy second. Family always.',
  },
  {
    title: 'How to Prepare Your House for a Puppy: The Complete Setup Guide',
    slug: 'how-to-prepare-your-house-for-a-puppy',
    excerpt: 'Puppy zones, barriers, hazard removal, and the house setup that makes the first weeks calm instead of chaotic.',
    category: 'family-systems',
    tags: 'preparing your house for a puppy, puppy house preparation, puppy zones, puppy safety',
    status: 'PUBLISHED',
    featured: false,
    metaDescription: 'How to prepare your house for a puppy. Room-by-room setup, puppy zones, barriers, and hazard removal.',
    content: '## Why House Setup Matters\n\nA puppy with unrestricted access to your home will pee on every surface, chew everything, and overwhelm the family within days.\n\n## The Core Principle: Zones, Not Freedom\n\n1. **Puppy Zone** — where the puppy lives, eats, sleeps (fully puppy-proofed)\n2. **Supervised Zone** — areas the puppy can access only with an adult present\n3. **No-Go Zone** — areas the puppy is never allowed (children\'s rooms, Mum\'s space)\n\n## Room-by-Room Preparation\n\n### Living Room\n- Move valuables to high shelves\n- Secure electrical cords\n- Remove toxic plants\n- Put shoes away\n\n### Kitchen\n- Use a baby gate — no-go zone\n- Secure bins\n- Move cleaning supplies\n\n### Bedrooms\n- Keep doors closed\n- Pick up choking hazards\n\n### Garden\n- Check fencing\n- Remove toxic plants\n- Store chemicals\n\n## The First 48 Hours\n\nThe house should be set up BEFORE the puppy arrives:\n1. Puppy zone ready\n2. Baby gates installed\n3. Hazards removed\n4. Cleaning supplies ready\n5. Routine written down\n\n**If Mum doesn\'t have space, the system is broken before it starts.**\n\nMum gets space. Puppy gets control.\n\nSystem first. Puppy second. Family always.',
  },
  {
    title: 'The Difference Between Wanting a Dog and Being Ready for One',
    slug: 'wanting-a-dog-vs-being-ready',
    excerpt: 'Every family wants a dog. Very few are ready for one. Here\'s the difference.',
    category: 'family-systems',
    tags: 'should we get a dog, family ready for a dog, wanting a dog, being ready, family dog readiness',
    status: 'PUBLISHED',
    featured: true,
    metaDescription: 'The difference between wanting a dog and being ready for one. Why love isn\'t enough.',
    content: '## Wanting Is Easy\n\nWanting a dog is the easiest part. But wanting a dog and being ready for one are two completely different things.\n\n## The Gap Nobody Talks About\n\n### 1. Desire ≠ Capability\nYou can want a dog and still not have the time or structure to care for one.\n\n### 2. Love ≠ Preparation\nLove doesn\'t clean up accidents at 5 AM. Systems do.\n\n### 3. Excitement ≠ Readiness\nExcitement lasts two weeks. Responsibility lasts 10-15 years.\n\n## What "Ready" Looks Like\n\n- Clear ownership (Dad owns the system)\n- Defined roles (everyone knows their job)\n- Mum\'s space protected\n- Realistic workload assessment\n- House prepared\n- Acceptance of "Not Ready"\n\n## What "Not Ready" Looks Like\n\n- Hasn\'t discussed who does what\n- Hasn\'t prepared the house\n- Hasn\'t assessed the workload\n- Mum hasn\'t been asked\n- Operating on excitement\n\n## The Hardest Outcome\n\nNOT READY is not failure. **NOT READY is the most responsible outcome.**\n\nBringing a puppy into a family that isn\'t ready is unfair to the puppy, the family, and the mother.\n\n## The Real Question\n\nThe question isn\'t "Do we want a dog?"\n\nThe question is: **"Are we the family this dog needs?"**\n\nSystem first. Puppy second. Family always.',
  },
  {
    title: 'Why Puppy Training Isn\'t the Whole Problem',
    slug: 'why-puppy-training-isnt-the-whole-problem',
    excerpt: 'Training books assume your family is ready. But no amount of training fixes a family system that wasn\'t prepared.',
    category: 'family-systems',
    tags: 'puppy training, family dog problems, why training isn\'t enough, family system',
    status: 'PUBLISHED',
    featured: false,
    metaDescription: 'Why puppy training isn\'t the whole problem. Training can\'t fix an unprepared family system.',
    content: '## The Training Assumption\n\nEvery dog training book starts from the same assumption: you already have the dog.\n\nBut training is only half the equation. The other half is whether the **family** is prepared.\n\n## What Training Can\'t Fix\n\n### 1. Unclear Roles\nTraining teaches the dog to sit. It doesn\'t teach the family who takes the dog out at 6 AM.\n\n### 2. Overwhelm\nTraining doesn\'t teach the family how to handle 3-5 hours of daily care.\n\n### 3. Mum\'s Resentment\nTraining doesn\'t address the fact that Mum feels trapped.\n\n### 4. Children\'s Loss of Interest\nTraining doesn\'t teach children that caring means showing up when you\'re bored.\n\n### 5. House Chaos\nTraining without environmental management is like teaching someone to swim in a tsunami.\n\n## The Missing Piece\n\n**A system for the family, not just the dog.**\n\nThe family system includes roles, house setup, Mum\'s space protection, reset protocols, and the Family Readiness Test.\n\n## Don\'t Train Your Way Out of a Family Problem\n\n- Dog pees inside → "We need better training" → Real problem: nobody is taking the dog out on a schedule\n- Dog jumps on kids → "We need obedience" → Real problem: kids are overstimulating the dog\n- Dog barks at night → "We need crate training" → Real problem: dog has too much freedom\n\n**Don\'t train your way out of a family problem. Fix the family system first.**\n\nSystem first. Puppy second. Family always.',
  },
]

async function seed() {
  console.log('🌱 Seeding articles...')
  for (const article of articles) {
    const existing = await db.article.findUnique({ where: { slug: article.slug } })
    if (!existing) {
      await db.article.create({
        data: {
          ...article,
          publishedAt: article.status === 'PUBLISHED' ? new Date() : null,
        },
      })
      console.log(`  ✅ ${article.slug}`)
    } else {
      console.log(`  ⏭️  ${article.slug} (already exists)`)
    }
  }
  console.log('🎉 Done!')
}

