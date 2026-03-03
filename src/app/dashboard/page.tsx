import { currentUser } from "@clerk/nextjs/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const user = await currentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <main className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-orange/30 relative overflow-hidden flex flex-col">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[80%] h-[80%] rounded-full bg-brand-orange/5 blur-[200px] animate-pulse-slow mix-blend-screen opacity-40" />
            </div>

            <Header />

            <div className="pt-48 pb-24 relative z-10 flex-grow max-w-5xl mx-auto px-6 w-full">
                <section className="space-y-12 animate-fade-in">
                    <div className="space-y-4">
                        <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
                            Welcome, <span className="text-brand-orange">{user.firstName || "Analyst"}</span>
                        </h1>
                        <div className="h-1 w-20 bg-brand-orange" />
                        <p className="text-2xl text-white/50 font-medium">
                            Your Career Exposure Dashboard
                        </p>
                    </div>

                    <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 backdrop-blur-md space-y-6">
                        <h3 className="text-2xl font-bold text-white tracking-tight">Recent Analysis</h3>
                        <p className="text-white/40 leading-relaxed font-medium">
                            You haven&apos;t saved any career exposure reports yet. Use the calculator to get started and save your Task Impact Scores here.
                        </p>
                        <div className="pt-4">
                            <Link href="/" className="inline-block py-4 px-8 bg-brand-orange/20 text-brand-orange border border-brand-orange/30 rounded-full font-bold text-lg hover:bg-brand-orange hover:text-white transition-all">
                                Run New Analysis
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
