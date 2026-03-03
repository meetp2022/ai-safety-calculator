import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)] bg-brand-dark pt-32 pb-24">
            <div className="w-full max-w-md p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-md shadow-2xl flex items-center justify-center">
                <SignIn appearance={{
                    elements: {
                        card: "bg-transparent shadow-none",
                        headerTitle: "text-white text-3xl font-black tracking-tight",
                        headerSubtitle: "text-white/50",
                        socialButtonsBlockButton: "border border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors",
                        socialButtonsBlockButtonText: "text-white font-semibold",
                        dividerLine: "bg-white/10",
                        dividerText: "text-white/30",
                        formFieldLabel: "text-white/60 font-semibold",
                        formFieldInput: "bg-white/5 border border-white/10 text-white rounded-xl focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors",
                        formButtonPrimary: "bg-brand-orange hover:bg-[#e64e1c] text-white rounded-xl font-bold transition-colors",
                        footerActionText: "text-white/50",
                        footerActionLink: "text-brand-orange hover:text-[#e64e1c]",
                        identityPreviewText: "text-white",
                        identityPreviewEditButton: "text-brand-orange hover:text-[#e64e1c]"
                    }
                }} />
            </div>
        </div>
    );
}
