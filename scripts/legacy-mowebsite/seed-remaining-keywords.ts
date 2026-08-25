import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const remainingArticles: Array<{ slug: string; title: string; excerpt: string; content: string; topic: string; featured: boolean; published: boolean }> = [
  {
    slug: 'puppy-behavior-routines-that-build-calm',
    title: 'Puppy Behavior Routines That Build a Calm, Predictable Dog',
    excerpt: 'Routines are not about control. They are about building the neural pathways that make good behaviour automatic for your puppy.',
    topic: 'Dog Behaviour',
    featured: false,
    published: false,
    content: `Routine is the invisible architecture of good dog behaviour. When a puppy experiences the same sequence of events at the same time each day, his brain builds neural pathways that make the expected behaviour increasingly automatic. This is not about control or rigidity. It is about giving the puppy's developing brain the repetition it needs to transform conscious effort into habit. A puppy who has been fed, walked, played, and settled at the same times for three weeks does not have to wonder what happens next. He knows. And a puppy who knows what happens next is a puppy who is calm.

The most important routines are the ones that bookend the day. The morning routine sets the tone. Wake up, potty break, breakfast, calm time, first walk. The evening routine settles the puppy for sleep. Final potty break, quiet time, crate, good night. When these bookend routines are consistent, the puppy develops a natural rhythm that aligns with the household rhythm. He wakes when the house wakes. He settles when the house settles. This synchronization reduces the friction that causes most behaviour problems.

Between these bookends, the daily routine should follow a predictable pattern. Potty breaks after meals, naps, and play sessions. Calm periods between active periods. Training sessions at the same time each day. The puppy does not need a rigid schedule to the minute, but he does need a consistent sequence.

Routines also build trust. A puppy who can predict what happens next feels safe. A puppy who cannot predict what happens next is anxious, and anxiety manifests as biting, barking, destructiveness, and inability to settle. When a family says their puppy is "unpredictable," the issue is usually that the household's routine is unpredictable, not the puppy.

The key is to protect the anchor points even when the rest of the day is flexible. If breakfast always happens within a thirty-minute window, the puppy's body clock adjusts. If it sometimes happens at seven, sometimes at ten, and sometimes at noon, the puppy's digestion, elimination schedule, and energy levels are constantly disrupted. Protect the anchors. Let the rest be flexible.

Routines do not need to be complex. They need to be consistent. The same words, the same order, the same people, at roughly the same times. This is what builds the calm, predictable dog that every family wants. And it starts on day one.`,
  },
  {
    slug: 'german-shepherd-puppy-care-complete-guide',
    title: 'German Shepherd Puppy Care: The Complete Guide to Your First Six Months',
    excerpt: 'German Shepherd puppies have specific needs for nutrition, exercise, socialization, and mental stimulation that differ from other breeds. Here is what you need to know.',
    topic: 'German Shepherd',
    featured: true,
    published: false,
    content: `German Shepherd puppies are among the most rewarding and most demanding breeds to raise. Their intelligence, loyalty, and capability make them extraordinary companions when raised correctly, and a source of frustration and potential danger when they are not. The first six months are the foundation for everything that follows, and understanding the breed's specific needs during this period is essential for every new German Shepherd owner.

Nutrition for a German Shepherd puppy must be breed-appropriate. Large breed puppy formulas control the calcium-to-phosphorus ratio and provide a slower growth rate that protects developing joints. German Shepherds are prone to hip dysplasia, and while nutrition alone cannot prevent this genetic condition, inappropriate nutrition can accelerate it. Feed measured meals two to three times daily until six months, then transition to twice daily. Do not free-feed a German Shepherd puppy, as overfeeding contributes to rapid growth and joint stress.

Exercise for a German Shepherd puppy must be carefully managed. The breed is active and intelligent, and the temptation is to provide vigorous exercise to match the puppy's energy. But the skeletal system takes eighteen to twenty-four months to fully develop, and high-impact exercise during the growth period can damage developing joints. Follow the guideline of five minutes of structured exercise per month of age, twice daily. So a three-month-old puppy gets fifteen minutes, twice a day. Supplement this with mental stimulation: training sessions, puzzle toys, scent games, and calm interaction with the family.

Socialization is critical and time-sensitive. The period between eight and sixteen weeks is when the puppy is most receptive to new experiences, but socialization does not mean throwing the puppy into every situation. For a German Shepherd, socialization means controlled, positive exposure to different people, sounds, surfaces, and environments. The book's principle applies: "No forced greetings. No random dogs. No dog parks." Controlled socialization builds confidence. Uncontrolled socialization can create fear and reactivity.

Mental stimulation is as important as physical exercise for this breed. German Shepherds were bred to work, and a German Shepherd without a job will find one, usually one you do not want. Training sessions, even short five-minute sessions two or three times per day, give the puppy's mind the work it craves. Puzzle feeders, scent games, and structured play that requires thinking are all valuable tools for preventing the boredom and frustration that lead to destructive behaviour.

The family system is the final and most important element. A German Shepherd puppy needs a clear leader, consistent rules, and a structured environment. The breed's intelligence means it learns quickly, both the things you want and the things you do not want. Inconsistency is punished by the German Shepherd's ability to exploit gaps in the system. If one parent allows jumping and the other does not, the puppy will jump on the permissive parent and test the other. If the rules change depending on the day or the mood, the puppy will become confused, anxious, or pushy.

The first six months with a German Shepherd puppy are demanding but they are also the period when the foundation for the next twelve to fourteen years is being built. Invest in nutrition, exercise, socialization, mental work, and consistency during these months, and the adult German Shepherd will be the calm, predictable, reliable dog the family can keep.`,
  },
  {
    slug: 'how-to-stop-puppy-biting-hands-guide',
    title: 'How to Stop Your Puppy From Biting Your Hands: A Step-by-Step Guide That Actually Works',
    excerpt: 'Puppy biting on hands is the number one complaint of new owners. This step-by-step approach uses redirection and consistency to solve the problem without punishment.',
    topic: 'Dog Behaviour',
    featured: false,
    published: false,
    content: `Puppy biting on hands is the most common complaint of new puppy owners, and the most commonly mishandled. The reason it persists in so many households is not that the technique is complicated. It is that families are inconsistent. They correct the biting sometimes, allow it other times, use different methods on different days, and eventually give up, concluding that the puppy is stubborn or that biting is just what puppies do. Biting is what puppies do. But it is also what puppies can stop doing, if the family follows a consistent system.

Step one: freeze. When the puppy bites your hand, stop all movement immediately. Do not pull your hand away, because pulling turns the interaction into a game of chase. Do not shout, because shouting adds energy to the situation. Simply go still. Become boring. The puppy will likely bite harder for a moment, testing whether the stillness is a new game. Hold the stillness.

Step two: redirect. After three to five seconds of stillness, offer the puppy an appropriate chew toy. Hold it near his mouth. When he releases your hand and takes the toy, immediately praise him calmly. Resume gentle interaction. The puppy learns: biting hands leads to nothing. Chewing toys leads to attention and play.

Step three: be consistent. Every person in the house must follow steps one and two every time. If one person allows gentle mouthing and another person corrects all biting, the puppy cannot learn the boundary. The rule must be absolute: teeth on skin means the interaction pauses. No exceptions for cute biting, no exceptions for gentle play, no exceptions because you are busy.

Step four: manage overtiredness. A puppy who is biting excessively is almost always an overtired puppy. When the biting becomes frantic and unresponsive to redirection, the puppy needs a nap, not more training. Put him in his crate or on his place. Most puppies will settle within five to ten minutes. When he wakes, the biting urge will be significantly reduced.

Step five: provide appropriate outlets. The puppy needs to chew. It is a developmental need. If you do not provide appropriate chew items, he will find his own: your furniture, your shoes, your children's toys. Have a variety of textures and densities available: rubber toys for heavy chewing, rope toys for softer chewing, frozen Kongs stuffed with food for extended chewing sessions. The puppy should always have an appropriate chew item within reach.

Step six: do not punish. Hitting, shouting, holding the mouth shut, or using bitter sprays may stop the biting in the moment, but they damage the trust between the puppy and the family. They also often escalate the behaviour because the puppy becomes more anxious or more aroused. Punishment addresses the symptom. The system addresses the cause.

The timeline for improvement varies. Most puppies show significant reduction in hand biting within two to three weeks of consistent redirection. The behaviour may not disappear entirely for three to four months, because teething adds oral discomfort that increases the urge to chew. But the intensity and frequency should decrease steadily if the system is followed.

If the biting is accompanied by growling, stiff body language, or seems aggressive rather than playful, consult a professional. But for the vast majority of families, the combination of freezing, redirecting, consistency, rest management, and appropriate chew outlets will solve the problem without conflict and without damaging the relationship with the puppy.`,
  },
];

async function main() {
  let created = 0;
  for (const article of remainingArticles) {
    try {
      await prisma.article.create({ data: article });
      created++;
      console.log(`  Created: ${article.slug}`);
    } catch (err: any) {
      console.error(`  ERROR on '${article.slug}': ${err.message}`);
    }
  }
  console.log(`\nAdded ${created} articles. All unpublished.`);
}

