// @ts-nocheck
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const articles = [
  {
    slug: 'puppy-crying-at-night-first-week-guide',
    title: 'Puppy Crying at Night in the First Week: A Survival Guide for Families',
    topic: 'Puppy Care',
    excerpt:
      'Your puppy cries at night because he is an infant in a new environment, not because he is being difficult. Here is how to manage it without starting bad habits.',
    content: `A puppy crying at night during the first week is the single most common trigger for puppy blues. It is also the moment most likely to break the household system. One adult gets up, the other stays in bed, resentment builds, and the puppy learns that crying produces company. By night three, the pattern is entrenched. By night seven, the family is exhausted and questioning every decision that led to this moment. The crying itself is not the problem. The problem is that most families have no plan for it.

Before You Say Yes to the Dog addresses night crying as a system issue, not a training issue. The puppy is not being manipulative. He is an eight-week-old infant who has just been separated from his mother and littermates and placed in a crate in an unfamiliar room. His distress is genuine and biologically appropriate. The question is not whether the puppy will cry — he almost certainly will — but how the family will respond when he does.

The first principle is that the response must be planned, not improvised. Before the puppy arrives, the family should agree on who will handle night disturbances, what the response will be, and under what conditions the plan changes. If the puppy has been in his crate for three hours and is crying, the planned response might be to take him outside for a toilet break, then return him to the crate with minimal interaction. If the puppy has just been out and is crying for attention, the planned response might be to wait. These decisions must be made in advance, when everyone is rested and rational, not at 3am when the puppy is screaming and the adults are barely conscious.

The second principle is that the crate must be associated with safety, not punishment. During the day, the puppy should have positive experiences in the crate — meals, treats, chew toys — so that by bedtime, the crate is a familiar and comfortable space. Many families make the mistake of only putting the puppy in the crate at night, when he is already distressed, which teaches the puppy that the crate is where bad things happen. This makes the crying worse, not better.

The third principle is consistency. If one adult responds to every cry while the other sleeps, the system breaks down. The responding adult burns out while the sleeping adult accumulates resentment. If the family alternates nights, the load is shared and the puppy receives a consistent message. The puppy may still cry, but the family managing the crying will be in much better shape to handle it.

How long does night crying last? For most puppies, the worst of it is over by week two. By week three to four, the puppy has adapted to the routine and the crying becomes infrequent or stops entirely. The families that struggle are the ones who respond inconsistently — sometimes getting up, sometimes not, sometimes bringing the puppy into bed, sometimes leaving him to cry. Inconsistency teaches the puppy that crying sometimes works, which means he will cry more, not less, because intermittent reinforcement is the most powerful reinforcement schedule there is.

If the puppy is crying and has not been outside for more than two to three hours, take him out. He may genuinely need to toilet. Keep the trip brief, quiet, and businesslike. No play, no cuddles, no conversation. Outside, toilet, back in the crate. If the puppy has been out recently and is crying for attention, the hardest but most effective response is to wait. Place a blanket over the crate to reduce visual stimulation, consider a white noise machine to mask household sounds, and wait for the puppy to settle. Most puppies will settle within ten to thirty minutes if the environment is calm and the response is consistent.

The first week of night crying is the hardest. It is also the most important. If the family holds the line during this period — follows the plan, shares the load, does not introduce exceptions — the puppy learns that the crate is safe, that night is for sleeping, and that crying does not produce company. This foundation makes everything that follows easier. Hold the line. It is worth it.`,
    published: false,
    featured: false,
  },
  {
    slug: 'puppy-feeding-schedule-complete-guide',
    title: 'Puppy Feeding Schedule: A Complete Guide for New Owners',
    topic: 'Puppy Care',
    excerpt:
      'How often, how much, and what to feed your new puppy. A practical feeding schedule that works with your household system, not against it.',
    content: `Feeding a puppy is one of the most tangible daily tasks of dog ownership, and it is one of the first areas where the household system is tested. Who feeds the puppy? When? How much? What happens if the designated person is not home? These questions sound simple until the puppy is actually in the house and the family discovers that mealtimes are not just about nutrition — they are about scheduling, coordination, and training opportunities that most families fail to capitalise on.

For the first eight to twelve weeks, puppies should be fed three times per day at roughly the same times. The exact times should fit the household's existing rhythm rather than imposing an arbitrary schedule that nobody can maintain. If the family eats breakfast at 7am, lunch at 1pm, and dinner at 6pm, the puppy can eat at those times too. The key is consistency: the same person feeds the puppy, at the same time, in the same place, every day. This predictability serves multiple purposes. It regulates the puppy's digestion. It creates reliable toilet patterns, since most puppies need to toilet within fifteen to thirty minutes of eating. And it establishes the human's role as the provider of resources, which is a foundation for all subsequent training.

How much to feed depends on the puppy's age, breed, and the specific food. The food packaging provides a starting point, but the family should monitor the puppy's body condition and adjust accordingly. A puppy at a healthy weight has a visible waist when viewed from above and palpable ribs without excessive pressure. If the puppy is gaining too much weight, reduce the portion slightly. If the puppy is thin, increase it. This monitoring is a shared responsibility — whoever feeds the puppy should be aware of what a healthy weight looks like and should be willing to adjust portions as needed.

The transition from three meals to two meals typically happens around twelve to sixteen weeks of age, depending on the breed and the puppy's individual development. Large breed puppies may stay on three meals longer because their growth is more sustained. The transition should be gradual — dropping the middle meal and slightly increasing the morning and evening portions over the course of a week. The puppy's digestion will adjust, and the household's schedule will simplify.

Mealtimes are training opportunities that most families waste. The puppy should not have free access to food. Food should be placed in the bowl and the bowl should be available for fifteen minutes. If the puppy does not eat within that window, the bowl is removed until the next scheduled meal. This teaches the puppy to eat when food is available, which is essential for households where the puppy will eventually need to eat on a reliable schedule. It also prevents the common problem of the picky eater who learns that refusing food produces something more interesting later.

The family system around feeding should include a backup plan. If the person who normally feeds the puppy at breakfast is not home, who does it? If the family is travelling, how is the puppy's feeding maintained? These questions should be answered before the puppy arrives, not discovered at the first scheduling conflict. The system that holds under normal conditions is good. The system that holds under unusual conditions is excellent.

Feeding is also the first place where children can participate meaningfully in the dog's care. An older child can measure the food and place the bowl, under supervision. A younger child can give the verbal cue that tells the puppy it is time to eat. These small contributions teach the child that the dog is a shared responsibility, not a toy, and they teach the puppy that all family members are providers of resources. As explored in Before You Say Yes to the Dog, the daily routines are the system's backbone, and feeding is the most consistent of those routines. Get it right from the start.`,
    published: false,
    featured: false,
  },
  {
    slug: 'puppy-sleep-schedule-how-much-sleep',
    title: 'Puppy Sleep Schedule: How Much Sleep Does a Puppy Really Need?',
    topic: 'Puppy Care',
    excerpt:
      'An eight-week-old puppy needs eighteen to twenty hours of sleep. That is not a typo. Here is how to build a sleep schedule that prevents the most common puppy problems.',
    content: `The single most underestimated factor in puppy raising is sleep. Families know their puppy will need to sleep at night. They do not expect their puppy to need to sleep for eighteen to twenty hours out of every twenty-four for the first several weeks. This means the puppy is awake for only four to six hours a day, distributed across two to three short periods. When families do not account for this, the puppy becomes overtired — and an overtired puppy bites more, cries more, struggles with training more, and generally makes everyone's life harder.

Why is sleep so critical? Puppies are developing rapidly. Their brains are growing, their bodies are changing, and the sensory input of a new home is overwhelming. Sleep is when the puppy processes all of this input. Without adequate sleep, the puppy's ability to learn, self-regulate, and behave appropriately degrades rapidly. The families that report the most behavioural problems — excessive biting, inability to settle, destructive behaviour — are almost always the families whose puppies are not getting enough sleep. The problem is not the puppy's temperament. It is the schedule.

A practical puppy sleep schedule looks like this. The puppy wakes up, goes outside to toilet, has breakfast, and has a short play or training session of ten to fifteen minutes. Then the puppy goes back to sleep in the crate or a confined area for one and a half to two hours. This cycle repeats throughout the day: wake, toilet, eat or play, sleep. The awake periods gradually lengthen as the puppy grows, but for the first few weeks, short awake periods with long sleep periods are the goal. Most families try to keep the puppy awake for too long because they want to interact with him. This is understandable but counterproductive. An overtired puppy is not fun to be around. A well-rested puppy is.

The crate is the most effective tool for managing sleep. A puppy in a crate cannot get into trouble, cannot chew the furniture, and cannot practise unwanted behaviours. More importantly, the crate provides a contained, quiet space where the puppy can sleep without being disturbed by household activity. The crate is not a cage. It is a management tool that protects the puppy and supports his development. Families that resist the crate almost always have puppies who sleep less, behave worse, and take longer to settle into the household routine.

Nap resistance is common and normal. Puppies do not want to stop playing, just like toddlers do not want to stop playing. But just like toddlers, puppies need enforced rest because they will not choose it themselves. If the puppy is showing signs of overtiredness — excessive biting, hyperactivity, inability to focus, crankiness — he has already been awake too long. The solution is not more activity. The solution is a nap. Put the puppy in the crate with a chew toy and let him settle. He may protest for a few minutes, but he will sleep.

Night sleep follows the same principle. Puppies cannot hold their bladders all night, so overnight sleep will be interrupted by toilet breaks for the first several weeks. But between breaks, the puppy should be in the crate, in a dark, quiet room, with minimal disturbance. The household should not be waking the puppy for interaction during the night. Night is for sleeping. The puppy's night-time crying should be managed according to the family's agreed plan, as discussed in the article on puppy crying at night.

The practical implication for the family system is significant. If the puppy needs to sleep eighteen to twenty hours a day, someone needs to be available to manage those sleep periods. The puppy cannot be left to sleep wherever and whenever he wants, because unsupervised sleep leads to unsupervised waking, which leads to toileting accidents, chewing, and other unwanted behaviours. The crate manages this, but the crate needs a person to put the puppy in it and take him out on schedule. The guidance in Before You Say Yes to the Dog frames sleep as a core system responsibility, not an afterthought. The family that plans for sleep from day one will have a calmer, more manageable puppy and a much smoother first month.`,
    published: false,
    featured: false,
  },
  {
    slug: 'crate-training-puppy-schedule-week-by-week',
    title: 'Crate Training a Puppy: A Week-by-Week Schedule That Works',
    topic: 'Puppy Care',
    excerpt:
      'Crate training is not optional for a family dog. It is the infrastructure of every other training goal. Here is a practical, week-by-week approach.',
    content: `Crate training is the foundation upon which almost every other aspect of puppy management is built. House training depends on it. Sleep management depends on it. Safe containment when the family cannot supervise depends on it. The puppy's ability to be calm and settled depends on it. Despite this, many families approach crate training reluctantly, feeling that it is cruel or unnecessary. This is a misunderstanding of what a crate is and what it does. A crate is not a prison. It is a den. And dogs are den animals by nature. When introduced correctly, the crate becomes the puppy's safest, most comfortable space — the place he chooses when he needs rest or security.

The first step in crate training is selecting the right crate. It should be large enough for the puppy to stand up, turn around, and lie down comfortably, but not so large that he can toilet in one corner and sleep in the other. For families with a large breed puppy who will grow significantly, a crate with a divider is the most practical option. The divider allows the family to adjust the crate's internal size as the puppy grows, maintaining the correct proportions throughout.

Week one is about association. The crate should be set up in a central location where the family spends time — the kitchen or living room, not an isolated room. The door should be open at all times. The puppy should find treats inside the crate randomly throughout the day. Meals should be fed inside the crate, with the door open. Toys and chews should be placed inside the crate. The goal is for the puppy to choose to enter the crate voluntarily and to associate it with positive experiences. No forcing, no closing the door, no pressure. Just positive association.

Week two introduces the closed door. Once the puppy is comfortably entering the crate and spending time inside, begin closing the door for short periods while the puppy is eating or chewing a high-value toy. Start with thirty seconds, then one minute, then five minutes. Stay nearby and speak calmly to the puppy if he becomes restless. Open the door before the puppy becomes distressed, not after. The goal is to teach the puppy that the door closing is not a problem, and that calm behaviour produces the door opening again. This is where many families fail — they wait until the puppy is crying and then open the door, which teaches the puppy that crying works. Open the door while the puppy is calm, even if it has only been a few seconds.

Week three extends the duration. By now the puppy should be comfortable with the door closed for five to ten minutes. Gradually extend this to thirty minutes, then an hour, then longer. Begin leaving the room briefly while the puppy is in the crate. Step out for thirty seconds, return, open the door. Extend the absence to a minute, five minutes, ten minutes. The puppy learns that being in the crate is safe even when you are not visible. This is the foundation for leaving the puppy alone when the family goes out, which is the ultimate goal of crate training.

By week four, the puppy should be comfortable in the crate for one to two hours during the day and sleeping through most of the night with scheduled toilet breaks. The crate is now part of the daily routine: the puppy goes in for naps, for mealtimes, and at bedtime. The family has a reliable management tool that makes every other aspect of puppy care easier.

The common mistakes to avoid: never use the crate as punishment, never leave the puppy in the crate for excessively long periods, never force the puppy into the crate, and never open the door while the puppy is actively crying or scratching at the crate. Each of these mistakes undermines the puppy's trust in the crate and slows or reverses the training. The system-first philosophy explored in Before You Say Yes to the Dog gives families a practical, week-by-week path to a crate-trained puppy. Consistency and patience are the tools. The crate is the infrastructure. Together, they make everything else possible.`,
    published: false,
    featured: false,
  },
  {
    slug: 'puppy-exercise-guide-how-much-is-enough',
    title: 'Puppy Exercise Guide: How Much Is Enough Without Causing Harm?',
    topic: 'Puppy Care',
    excerpt:
      'More exercise is not always better. Over-exercising a puppy, especially a large breed, can cause lasting damage. Here is a safe, practical exercise guide.',
    content: `The question of how much exercise a puppy needs is one of the most common — and most dangerous — questions new owners ask. It is dangerous because the intuitive answer, "as much as he wants," is exactly wrong. Puppies, like human children, do not know their own limits. A puppy will run until he collapses, not because he is fit, but because he does not understand that his growing body needs protection. It is the owner's responsibility to set appropriate limits, and those limits are much lower than most people realise.

The general guideline is five minutes of structured exercise per month of age, twice a day. So a two-month-old puppy gets ten minutes per walk. A four-month-old puppy gets twenty minutes. A six-month-old puppy gets thirty minutes. This applies to formal, on-lead exercise — the walk. It does not apply to free play in the garden, which the puppy can self-regulate to some degree. But even garden play should be monitored, because puppies will over-exert themselves given the opportunity.

Why are the limits so low? Because the puppy's growth plates — the areas of developing cartilage at the ends of long bones — are not yet closed. Repetitive impact on open growth plates can cause micro-damage that leads to developmental orthopaedic disease. In large and giant breed puppies, this risk is especially pronounced. German Shepherds, Labrador Retrievers, Golden Retrievers, and Rottweilers are among the breeds most susceptible to conditions like hip dysplasia and osteochondritis dissecans, and excessive exercise during the growth period is a known contributing factor. The damage done during these months is permanent. It cannot be undone.

This does not mean the puppy should be sedentary. Mental exercise is just as valuable as physical exercise, and it carries none of the injury risk. Training sessions, puzzle feeders, scent games, and gentle socialisation provide the puppy with stimulation and learning opportunities without stressing his developing joints. A ten-minute training session where the puppy practises sit, down, recall, and loose-lead walking is more tiring — and more beneficial — than a thirty-minute walk.

Forced exercise should be avoided entirely in young puppies. This includes running alongside a bicycle, jogging with the owner, repetitive ball throwing, and access to stairs. Stairs are a particular hazard because the combination of impact and uneven surfaces stresses the growth plates in ways that flat ground does not. If the home has stairs, the puppy should be carried up and down for the first few months, or a stair gate should be installed to block access.

Swimming is often recommended as a safe form of exercise for puppies, and it can be, but with caveats. The water should be warm and shallow. The puppy should not be forced to swim. And the session should be short — five to ten minutes maximum for very young puppies. Cold water, deep water, and prolonged swimming sessions can be just as taxing as land-based exercise.

The practical question for families is how to manage the puppy's energy within these constraints. The answer is structure. A puppy who has a predictable daily routine of short walks, training sessions, garden play, and long sleep periods is a puppy whose energy is well-managed. A puppy who is under-exercised mentally but over-exercised physically is a recipe for both behavioural problems and joint problems. The framework in Before You Say Yes to the Dog encourages families to think of exercise as a system component — planned, measured, and integrated into the broader daily routine — rather than something the puppy demands and the owner provides on impulse. The puppy's future joint health depends on the decisions made in these first few months. Take them seriously.`,
    published: false,
    featured: false,
  },
  {
    slug: 'when-can-puppy-go-outside-safely',
    title: 'When Can a Puppy Go Outside Safely? A UK Vet-Guided Timeline',
    topic: 'Puppy Care',
    excerpt:
      'The UK vaccination schedule, safe socialisation windows, and exactly when your puppy can walk on public ground — all in one clear guide.',
    content: `One of the most confusing aspects of bringing a puppy home is knowing when it is safe to take him outside. The advice is often contradictory: one person says the puppy must not set foot outdoors until fully vaccinated, another says the puppy must be socialised immediately or he will be permanently fearful. Both are partly right and partly wrong, and the confusion puts new owners in an impossible position. Here is a clear, UK-specific timeline based on current veterinary guidance.

In the UK, puppies typically receive their first vaccination at eight weeks of age and their second vaccination at ten to twelve weeks. The most common vaccines cover canine parvovirus, canine distemper, canine adenovirus, and leptospirosis. Full protection is not immediate after the second vaccination. The puppy's immune system needs approximately one week after the second injection to mount a full protective response. This means that, in most cases, a puppy can walk on public ground — pavements, parks, beaches, anywhere other dogs may have been — approximately one week after his second vaccination, at around eleven to thirteen weeks of age.

But what about the period between coming home at eight weeks and being fully protected at twelve weeks? This is the socialisation window, and it matters enormously. Puppies have a critical socialisation period that begins at around three weeks and closes at around twelve to fourteen weeks. During this window, the puppy is most receptive to new experiences. After it closes, the puppy becomes increasingly cautious about novel stimuli, and experiences that would have been positive at nine weeks may be frightening at fifteen weeks. Waiting until the puppy is fully vaccinated before exposing him to anything outside the home means wasting half of this critical window. That is not acceptable.

The solution is safe socialisation. The puppy can be carried outside — in your arms, in a sling, or in a dog carrier — to experience the sights, sounds, and smells of the world without his paws touching contaminated ground. He can be taken to cafés, town centres, school gates, and busy streets. He can meet vaccinated, healthy adult dogs in private gardens. He can be exposed to traffic, bicycles, pushchairs, people wearing hats or high-visibility clothing, and children playing. Each of these experiences builds the puppy's confidence and reduces the likelihood of fear-based behavioural problems later in life.

The distinction is between "outside on the ground" and "outside off the ground." On the ground, the puppy is at risk of picking up pathogens from infected faeces, urine, or soil. Off the ground — carried or in a carrier — the puppy gets the environmental exposure without the disease risk. This is not a compromise. It is the recommended approach in the UK, endorsed by the British Veterinary Association and the Animal Behaviour and Training Council.

Your own garden is generally considered safe, provided no unvaccinated dogs have had access to it recently. The puppy can toilet and play in the garden from day one, which is essential for house training. If you do not have a private garden, a small area of paving that can be cleaned and disinfected can serve the same purpose.

Visiting other people's homes where there are vaccinated dogs is also generally safe, but the host dog should be up to date with vaccinations and free of any signs of illness. Puppy classes that require proof of vaccination for all attendees are another excellent option for safe socialisation during this period.

The key message is this: do not wait until full vaccination to start the socialisation process, and do not put the puppy on the ground in public spaces before full vaccination. Carry him, expose him, and protect him simultaneously. The framework in Before You Say Yes to the Dog emphasises that good decisions come from understanding the system — in this case, the interplay between immune protection and behavioural development. By following this timeline, you give your puppy the best of both worlds: safety and confidence.`,
    published: false,
    featured: false,
  },
  {
    slug: 'when-is-right-time-get-dog-family',
    title: 'When Is the Right Time to Get a Dog? A Family Readiness Framework',
    topic: 'Dog Ownership',
    excerpt:
      'Forget the children’s ages. The real question is whether your family system can absorb a dog. Here is a practical framework for deciding.',
    content: `Most families approach the question of getting a dog by asking how old their children should be. This is the wrong question. A five-year-old in a stable, well-resourced household with clear routines and available adults is in a far better position to welcome a dog than a ten-year-old in a chaotic household where everyone is stretched too thin. The child's age is a factor, but it is not the factor. The factor is the family system's capacity to absorb a new, demanding, permanent member.

What does family readiness actually mean? It means the household has enough slack — enough time, energy, emotional bandwidth, and financial margin — to add a dog without collapsing the existing system. A household that is already functioning at maximum capacity — where both parents work full-time, the children have activities every evening, weekends are packed, and nobody has a spare hour — cannot add a dog without something giving way. That something is usually the dog's needs, which means the dog is under-exercised, under-trained, and under-stimulated, which means the dog becomes a source of stress rather than joy.

The Simple Family Readiness Test is a practical tool for assessing this capacity. It asks four questions. First, can the family identify at least one adult who is available to be with the dog during the day for the first four to six months? This does not mean twenty-four-hour supervision, but it does mean someone is around for toilet breaks, meals, and socialisation opportunities. A puppy left alone for eight hours a day at eight weeks of age will not develop normally. Second, does the family have a predictable daily routine into which a dog's needs can be integrated? Dogs thrive on routine. If the family's schedule is unpredictable, the dog's schedule will be too, and the dog will suffer for it. Third, does the family have the financial margin to cover not just the purchase or adoption cost, but ongoing veterinary care, food, insurance, equipment, and unexpected expenses? The average lifetime cost of a dog in the UK is between £12,000 and £24,000, depending on size and breed. Fourth, is every adult in the household genuinely committed to getting a dog? If one partner is ambivalent, that ambivalence will manifest as reluctance to participate in the dog's care, which will create resentment and inequity.

Seasonal timing also matters more than most families realise. Getting a puppy in late autumn or winter means dark evenings, bad weather for toilet training, and limited outdoor socialisation opportunities. Getting a puppy in spring or early summer means longer daylight hours, better weather, and more opportunities for outdoor training and socialisation. This does not mean you should never get a winter puppy, but it does mean you should plan for the challenges. If you get a puppy in December, you need a plan for toilet training in the rain and dark, because the puppy will not wait for convenient weather.

Workload capacity is the element most families underestimate. A puppy in the first month requires more time and attention than most people expect. Toilet training, feeding, socialisation, training, play, and management fill every waking hour. The family that is already busy will find this overwhelming. The family that has deliberately created space — that has reduced commitments, simplified schedules, and prepared for an intensive period — will find it manageable.

Before You Say Yes to the Dog introduces the idea that the dog must fit the family, not the other way around. A family that adapts its system to accommodate a dog — that adjusts schedules, shares responsibilities, and plans for contingencies — is a family that will thrive with a dog. A family that expects the dog to adapt to an already-overloaded system will struggle. The right time to get a dog is not when the children reach a certain age. It is when the family system is ready. Use the framework, answer honestly, and decide from there.`,
    published: false,
    featured: false,
  },
];

async function main() {
  let created = 0;
  let skipped = 0;

  for (const article of articles) {
    const exists = await prisma.article.findUnique({ where: { slug: article.slug } });
    if (exists) {
      console.log(`SKIPPED (already exists): ${article.slug}`);
      skipped++;
      continue;
    }
    await prisma.article.create({ data: article });
    console.log(`CREATED: ${article.slug}`);
    created++;
  }

  console.log(`\nDone. Created: ${created}, Skipped (already existed): ${skipped}, Total: ${articles.length}`);
}

