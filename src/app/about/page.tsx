import Link from 'next/link'
import { ArrowRight, GraduationCap, Award, Briefcase, BookOpen, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen bg-[#F5F1E8]">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1B3B36] mb-4">About Mohamed</h1>
          <p className="text-lg text-[#6B5D4F]">Business Leader | Marketing & Growth Strategist | Visiting Professor | Author</p>
          <div className="w-16 h-1 bg-[#C9A86A] rounded-full mx-auto mt-6" />
        </div>

        {/* Professional narrative */}
        <div className="space-y-6 text-lg text-[#2A2520] leading-relaxed mb-12">
          <p>
            Mohamed Abu Khadra is a business leader, marketing and growth strategist, visiting
            professor, and author with more than two decades of experience working across marketing,
            go-to-market strategy, partnerships, business development and growth.
          </p>
          <p>
            His career has spanned corporate leadership, entrepreneurship, payments, technology and
            consulting, with a recurring focus on one question:
          </p>
          <p className="font-serif text-xl text-[#1B3B36] italic text-center">
            How do you turn a good idea into something that actually works?
          </p>
          <p>
            He has held senior leadership roles across technology and financial services, built and
            led businesses, worked on market-entry and growth strategies, and teaches postgraduate
            and executive audiences in areas including marketing, business planning and
            international business.
          </p>
        </div>

        {/* Credentials */}
        <div className="grid gap-4 mb-12">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-white border border-[#EBE5D5]">
            <GraduationCap className="h-5 w-5 text-[#1B3B36] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#1B3B36]">Doctor of Business Administration (DBA)</p>
              <p className="text-sm text-[#6B5D4F]">Strategic Management</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-white border border-[#EBE5D5]">
            <GraduationCap className="h-5 w-5 text-[#1B3B36] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#1B3B36]">Fellow Marketer, Chartered Institute of Marketing (CIM)</p>
              <p className="text-sm text-[#6B5D4F]">Professional marketing accreditation</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-white border border-[#EBE5D5]">
            <Award className="h-5 w-5 text-[#C9A86A] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#1B3B36]">Most Innovative Payment Solutions CEO 2023</p>
              <p className="text-sm text-[#6B5D4F]">MEA Markets CEO of the Year Awards</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-white border border-[#EBE5D5]">
            <Briefcase className="h-5 w-5 text-[#1B3B36] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#1B3B36]">Visiting Professor</p>
              <p className="text-sm text-[#6B5D4F]">Postgraduate teaching in marketing, business planning and international business</p>
            </div>
          </div>
        </div>

        {/* The bridge to books */}
        <div className="p-8 rounded-xl bg-[#1B3B36] text-white mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#C9A86A] mb-4">A Different Kind of Problem</h2>
          <div className="space-y-4 text-white/90 leading-relaxed">
            <p>
              But his work is not limited to business.
            </p>
            <p>
              As a father, Mohamed experienced three failed attempts to bring a dog into his family
              home. The experience eventually led him to apply the same systems thinking he had used
              professionally to a very different problem: why can a family love the idea of having a
              dog and still not be ready to live with one?
            </p>
            <p className="font-serif italic text-[#C9A86A]">
              That question became the foundation for his first books.
            </p>
            <p>
              Before You Say Yes to the Dog and After You Say Yes to the Dog turn that experience
              into a practical two-book family system: one for deciding and preparing before the dog
              arrives, and one for operating successfully after the decision has been made.
            </p>
            <p>
              He does not present himself as a veterinarian, breeder or professional dog trainer.
              His contribution is different. He is a father who found that love was not enough —
              and built a system around what was missing.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/books" className="book-btn-primary">
            Explore the Books
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/speaking" className="book-btn-outline">
            Speaking & Teaching
          </Link>
        </div>
      </div>
    </div>
  )
}
