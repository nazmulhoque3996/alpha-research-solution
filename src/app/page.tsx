"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Hind_Siliguri, Inter, Merriweather } from "next/font/google";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const [lang, setLang] = useState("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [workflowVisible, setWorkflowVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [chooseUsVisible, setChooseUsVisible] = useState(false);
  const [faqVisible, setFaqVisible] = useState(false);
  
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);
  
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const workflowRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const chooseUsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createObserver = (ref: React.RefObject<HTMLDivElement | null>, setVisible: (val: boolean) => void) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    };

    const o1 = createObserver(workflowRef, setWorkflowVisible);
    const o2 = createObserver(servicesRef, setServicesVisible);
    const o3 = createObserver(chooseUsRef, setChooseUsVisible);
    const o4 = createObserver(faqRef, setFaqVisible);
    const o5 = createObserver(testimonialsRef, setTestimonialsVisible);

    return () => {
      o1.disconnect();
      o2.disconnect();
      o3.disconnect();
      o4.disconnect();
      o5.disconnect();
    };
  }, []);

  const testimonialSliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (testimonialSliderRef.current) {
      testimonialSliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (testimonialSliderRef.current) {
      const { scrollLeft: currentLeft, scrollWidth, clientWidth } = testimonialSliderRef.current;
      if (currentLeft + clientWidth >= scrollWidth - 15) {
        testimonialSliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        testimonialSliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (testimonialSliderRef.current) {
        const { scrollLeft: currentLeft, scrollWidth, clientWidth } = testimonialSliderRef.current;
        if (currentLeft + clientWidth >= scrollWidth - 15) {
          testimonialSliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          testimonialSliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
        }
      }
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Strict font implementation classes
  const textFont = lang === "en" ? inter.className : "";
  const headingFont = lang === "en" ? merriweather.className : "";

  const workflowSteps = [
    {
      step: 1,
      title: lang === "en" ? "Foundation & Ideation" : "ফাউন্ডেশন ও আইডিয়া জেনারেশন",
      subtitle: lang === "en" ? "Topic Selection, Literature Review & Problem Statement" : "টপিক সিলেকশন, লিটারেচার রিভিউ ও প্রবলেম স্টেটমেন্ট",
      description: lang === "en"
        ? "We help you select a novel research topic, perform a comprehensive survey of state-of-the-art papers (IEEE, Springer, Elsevier), and formulate a clear, impactful problem statement that stands out to reviewers."
        : "আমরা আপনাকে একটি নতুন ও নোবেল রিসার্চ টপিক সিলেক্ট করতে সাহায্য করি, স্টেট-অব-দ্য-আর্ট পেপারগুলোর (IEEE, Springer, Elsevier) ওপর লিটারেচার রিভিউ করি এবং একটি শক্তিশালী প্রবলেম স্টেটমেন্ট তৈরি করি যা রিভিউয়ারদের দৃষ্টি আকর্ষণ করবে।",
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.782 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      step: 2,
      title: lang === "en" ? "Data Engineering" : "ডাটা ইঞ্জিনিয়ারিং",
      subtitle: lang === "en" ? "Dataset Collection & Data Preprocessing" : "ডাটাবেজ কালেকশন ও ডাটা প্রি-প্রসেসিং",
      description: lang === "en"
        ? "We assist in sourcing high-quality datasets (Kaggle, UCI, custom collections) and apply essential preprocessing: cleaning, balancing (SMOTE), feature engineering, scaling, and train-test-val splits."
        : "আমরা আপনাকে বিভিন্ন ওপেন সোর্স সোর্স (Kaggle, UCI, ইত্যাদি) থেকে হাই-কোয়ালিটি ডাটা কালেকশনে সাহায্য করি। ডাটা ক্লিনিং, ব্যালেন্সিং (SMOTE), ফিচার ইঞ্জিনিয়ারিং এবং ট্রেন-টেস্ট-ভ্যালিডেশন স্প্লিট সম্পন্ন করি।",
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    {
      step: 3,
      title: lang === "en" ? "Core AI Modeling" : "কোর এআই মডেলিং",
      subtitle: lang === "en" ? "Model Development, Training & Evaluation" : "মডেল ডেভেলপমেন্ট, ট্রেনিং ও ইভালুয়েশন",
      description: lang === "en"
        ? "Our team designs custom ML/DL architectures (CNNs, Transformers, GNNs, LSTMs, or Hybrids), runs training scripts, fine-tunes hyperparameters, and evaluates with rigorous scientific metrics."
        : "আমাদের টিম আপনার জন্য কাস্টম ML/DL আর্কিটেকচার (CNN, Transformer, GNN, LSTM বা হাইব্রিড মডেল) ডিজাইন ও কোড করে, হাইপারপ্যারামিটার টিউনিং সম্পন্ন করে এবং বৈজ্ঞানিক ম্যাট্রিক্সের সাহায্যে মডেল ইভালুয়েট করে।",
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      step: 4,
      title: lang === "en" ? "Execution & Integration" : "এক্সিকিউশন ও ইন্টিগ্রেশন",
      subtitle: lang === "en" ? "Implementation of Proposed Architecture" : "প্রস্তাবিত আর্কিটেকচার ইমপ্লিমেন্টেশন",
      description: lang === "en"
        ? "We finalize the code repository, compile result figures (Accuracy/Loss curves, ROC curves, Confusion Matrices, t-SNE plots), and wrap everything in clean, documented Python notebooks or scripts."
        : "আমরা কোড রিপোজিটরি ফাইনাল করি, সব রেজাল্ট ফিগার (Accuracy/Loss curves, ROC curves, Confusion Matrices, t-SNE plots) গুছিয়ে দিই এবং সম্পূর্ণ কোড ডকুমেন্টেশন ও পাইথন নোটবুক আকারে হ্যান্ডওভার করি।",
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      step: 5,
      title: lang === "en" ? "Academic Delivery" : "একাডেমিক ডেলিভারি",
      subtitle: lang === "en" ? "University-Standard Report Writing & Defense Slides" : "ইউনিভার্সিটি স্ট্যান্ডার্ড রিপোর্ট রাইটিং ও প্রেজেন্টেশন স্লাইড",
      description: lang === "en"
        ? "We deliver a comprehensive Overleaf/LaTeX report formatted to your university specifications, accompanied by modern defense presentation slides and viva preparation mock sessions."
        : "আমরা আপনার ইউনিভার্সিটির ফরম্যাট অনুযায়ী একটি সম্পূর্ণ Overleaf/LaTeX রিপোর্ট ডেলিভারি করি, সাথে ফাইনাল ডিফেন্স প্রেজেন্টেশন স্লাইড এবং মক ভাইভা সেশনের মাধ্যমে আপনাকে ডিফেন্সের জন্য প্রস্তুত করি।",
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-4-9 4 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    }
  ];

  const pricingPlans = [
    {
      id: "coding",
      title: lang === "en" ? "Coding & Modeling Package" : "কোডিং ও মডেলিং প্যাকেজ",
      price: "৳8,499",
      description: lang === "en" ? "Complete implementation of the technical core for your research." : "আপনার রিসার্চের সম্পূর্ণ টেকনিক্যাল কোডিং অংশের ইমপ্লিমেন্টেশন।",
      features: lang === "en" ? [
        "Data Pre-processing & Balancing (SMOTE)",
        "Model Selection & Baseline Construction",
        "Custom Hybrid ML/DL Architecture Design",
        "Ablation Studies & Validation Reports",
        "Clean, Well-Commented Source Code"
      ] : [
        "ডাটা প্রি-প্রসেসিং ও ব্যালেন্সিং (SMOTE)",
        "মডেল সিলেকশন ও বেসলাইন কোড তৈরি",
        "কাস্টম হাইব্রিড ML/DL আর্কিটেকচার ডিজাইন",
        "অ্যাবলেশন স্টাডিজ ও ভ্যালিডেশন রিপোর্ট",
        "ক্লিন ও ওয়েল-কমেন্টেড সোর্স কোড ডেলিভারি"
      ],
      whatsappLink: "https://wa.me/8801405562685?text=Hello%20Alpha%20Research%20Solution%2C%20I%20want%20to%20enroll%20in%20the%20Coding%20%26%20Modeling%20Package%20(৳8%2C499).%20Please%20guide%20me%20on%20the%20next%20steps.",
      isHighlighted: false,
      buttonText: lang === "en" ? "Choose Coding Package" : "কোডিং প্যাকেজ বেছে নিন"
    },
    {
      id: "full-project",
      title: lang === "en" ? "Full Project Solution" : "ফুল প্রজেক্ট সলিউশন",
      price: "৳14,999",
      description: lang === "en" ? "End-to-end consulting covering code development and university report." : "টেকনিক্যাল কোডিং থেকে শুরু করে সম্পূর্ণ থিসিস রিপোর্ট রাইটিং সাপোর্ট।",
      features: lang === "en" ? [
        "Everything in Coding & Modeling Package",
        "Complete University-Standard Thesis Report",
        "Overleaf / LaTeX Setup & Structuring",
        "Plagiarism Checks & Free Revisions",
        "Professional Defense Slides & Viva Guidance"
      ] : [
        "কোডিং ও মডেলিং প্যাকেজের সবকিছু",
        "সম্পূর্ণ ইউনিভার্সিটি-স্ট্যান্ডার্ড থিসিস রিপোর্ট",
        "Overleaf / LaTeX ফাইল সেটআপ ও স্ট্রাকচারিং",
        "প্লেজিয়ারিজম চেক ও ফ্রী কারেকশন সাপোর্ট",
        "প্রফেশনাল ডিফেন্স স্লাইড ও ভাইভা প্রিপারেশন"
      ],
      whatsappLink: "https://wa.me/8801405562685?text=Hello%20Alpha%20Research%20Solution%2C%20I%20want%20to%20claim%20the%20first-3-students%20discount%20for%20the%20Full%20Project%20Solution%20(৳14%2C999).%20Is%20it%20still%20available%3F",
      isHighlighted: true,
      badgeText: lang === "en" ? "Save ৳1000 for first 3 students" : "প্রথম ৩ জন স্টুডেন্টের জন্য ৳১০০০ ছাড়",
      buttonText: lang === "en" ? "Choose Full Solution" : "ফুল সলিউশন বেছে নিন"
    },
    {
      id: "report",
      title: lang === "en" ? "University Standard Report Writing" : "ইউনিভার্সিটি স্ট্যান্ডার্ড রিপোর্ট রাইটিং",
      price: "৳7,499",
      description: lang === "en" ? "Academic thesis writing aligned with your university's guidelines." : "আপনার রিসার্চ ডাটার ওপর ভিত্তি করে স্ট্যান্ডার্ড থিসিস পেপার রাইটিং।",
      features: lang === "en" ? [
        "Thesis Report Draft from Your Existing Data",
        "Strict Formatting & Citations (IEEE, APA, etc.)",
        "Chapter-by-Chapter Drafts for Supervisor Review",
        "Methodology & Results Interpretation",
        "Complimentary Supervisor Feedback Revisions"
      ] : [
        "আপনার বিদ্যমান ডাটার ওপর থিসিস রিপোর্ট ড্রাফট",
        "ইউনিভার্সিটি গাইডলাইন অনুযায়ী সাইটেশন ও ফরম্যাটিং",
        "সুপারভাইজার এপ্রুভালের জন্য চ্যাপ্টার-ভিত্তিক ড্রাফট",
        "মেথডোলজি ও রেজাল্ট সেকশন ডেসক্রিপশন",
        "সুপারভাইজরের ফিডব্যাক অনুযায়ী ফ্রী রিভিশন সাপোর্ট"
      ],
      whatsappLink: "https://wa.me/8801405562685?text=Hello%20Alpha%20Research%20Solution%2C%20I%20want%20to%20enroll%20in%20the%20University%20Standard%20Report%20Writing%20Package%20(৳7%2C499).%20Please%20guide%20me%20on%20the%20next%20steps.",
      isHighlighted: false,
      buttonText: lang === "en" ? "Choose Writing Package" : "রাইটিং প্যাকেজ বেছে নিন"
    }
  ];

  const chooseUsPoints = [
    {
      title: lang === "en" ? "Friendly Strategy & Consultation" : "ফ্রি স্ট্র্যাটেজি ও কনসালটেশন",
      subtitle: lang === "en" ? "Personalized Roadmap" : "ব্যক্তিগত রোডম্যাপ",
      description: lang === "en"
        ? "We start with a friendly discussion, collect your specific requirements, and provide strategic advice on how to seamlessly clear your defense."
        : "শুরুতেই আমরা বন্ধুত্বপূর্ণ আলোচনার মাধ্যমে আপনার রিকোয়ারমেন্ট বুঝে নিই এবং কীভাবে সহজেই ডিফেন্স ক্লিয়ার করবেন, সেই গাইডলাইন দিই।",
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: lang === "en" ? "Transparent Milestone Updates" : "স্বচ্ছ মাইলস্টোন আপডেট",
      subtitle: lang === "en" ? "Total Visibility" : "সম্পূর্ণ ভিজিবিলিটি",
      description: lang === "en"
        ? "No keeping you in the dark. We share literature reviews, code files, and report drafts progressively as we hit each milestone."
        : "আপনাকে অন্ধকারে না রেখে কাজের প্রতি ধাপে লিটারেচার রিভিউ, কোড ফাইল ও রিপোর্টের ড্রাফট প্রগতিশীলভাবে শেয়ার করা হবে।",
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      title: lang === "en" ? "Live Walkthrough Meetings" : "লাইভ ওয়ান-থ্রু মিটিং",
      subtitle: lang === "en" ? "Complete Comprehension" : "সম্পূর্ণ ধারণা অর্জন",
      description: lang === "en"
        ? "We don't just hand over files. Our expert team conducts live meetings to explain every line of code and report detail, ensuring you understand your thesis inside out."
        : "আমরা শুধু কোড বা রিপোর্ট ধরিয়ে দিয়ে গায়েব হয়ে যাই না। লাইভ মিটিংয়ে বসে পুরো প্রজেক্ট আপনাকে হাতে-কলমে বুঝিয়ে দিই।",
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: lang === "en" ? "Inspiring True Research" : "আসল Research-এর অনুপ্রেরণা",
      subtitle: lang === "en" ? "Learn & Grow" : "শেখা ও এগিয়ে যাওয়া",
      description: lang === "en"
        ? "We aim to inspire you. By breaking down complex ML/DL concepts, we build your genuine interest in the research sector, turning a stressful requirement into a learning experience."
        : "জতিলা ML/DL কনসেপ্ট সহজ ভাষায় বুঝিয়ে আপনার মধ্যে রিসার্চের প্রতি আগ্রহ তৈরি করি, যাতে থিসিসকে বোঝা না মনে হয়।",
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: lang === "en" ? "Uncompromising Academic Quality" : "আপসহীন একাডেমিক কোয়ালিটি",
      subtitle: lang === "en" ? "Free Supervisor Revisions" : "ফ্রি সুপারভাইজার রিভিশন",
      description: lang === "en"
        ? "Top-tier architecture models and university-standard formatting that satisfy supervisors. We guarantee free revisions to fully resolve feedback from your supervisor or defense board."
        : "সুপারভাইজর বা ইন্টারনাল বোর্ডের যেকোনো ফিডব্যাক বা কারেকশন (বিশেষ করে রিপোর্টের ক্ষেত্রে) আমরা নিজ দায়িত্বে সমাধান করে দিই।",
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-4-9 4 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    },
    {
      title: lang === "en" ? "Ultimate Defense Confidence" : "ডিফেন্সে ১০০% কনফিডেন্স",
      subtitle: lang === "en" ? "Ace the Viva" : "ভাইভা জয়",
      description: lang === "en"
        ? "With our mock Q&A and presentation slide prep, you will walk into your defense room feeling 100% confident and ready to handle any question."
        : "আমাদের মক ভাইভা প্রিপারেশন, কমন প্রশ্নত্তোর আলোচনা ও প্রফেশনাল স্লাইডের কারণে আপনি ডিফেন্সে আত্মবিশ্বাসের সাথে দাঁড়াতে পারবেন।",
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: lang === "en" ? "How does the payment system work?" : "পেমেন্ট সিস্টেম কীভাবে কাজ করে?",
      answer: lang === "en"
        ? "We operate on a transparent 3-phase pre-payment milestone structure. You pay for each milestone (Initial Setup, Mid-Progress AI Modeling, and Final LaTeX/Delivery Phase) before work begins on that phase, ensuring structured progress and zero upfront financial pressure."
        : "আমরা পেমেন্ট সিস্টেমকে ৩টি মাইলস্টোনে ভাগ করেছি। কাজ শুরুর আগে প্রথম মাইলস্টোন, কোড ডেমোর সময় দ্বিতীয় মাইলস্টোন, এবং চূড়ান্তLaTeX রিপোর্ট ও ফাইল পাওয়ার আগে শেষ মাইলস্টোন পেমেন্ট করতে হবে।"
    },
    {
      question: lang === "en" ? "What if my supervisor requests changes?" : "আমার সুপারভাইজার যদি কোনো পরিবর্তন চান?",
      answer: lang === "en"
        ? "We provide comprehensive, ongoing support. We guarantee free supervisor feedback revisions, ensuring that any modifications requested by your supervisor or internal defense board (especially regarding report structure, content, or formatting) are fully resolved."
        : "আমরা সুপারভাইজর বা ইন্টারনাল বোর্ডের যেকোনো ফিডব্যাক বা কারেকশন (বিশেষ করে রিপোর্টের ক্ষেত্রে) আমরা নিজ দায়িত্বে সমাধান করে দিই।"
    },
    {
      question: lang === "en" ? "What if I don't have a dataset?" : "আমার কাছে কোনো ডাটাসেট না থাকলে কী হবে?",
      answer: lang === "en"
        ? "Don't worry! We assist you in sourcing high-quality datasets from open-source repositories (Kaggle, UCI, or specific research papers). We also handle data cleaning, balancing, feature engineering, and preprocessing to prepare it for core training."
        : "আমরা আপনাকে সোর্স পেপার বা বিভিন্ন ডাটাবেজ থেকে হাই-কোয়ালিটি ডাটাসেট সোর্স করতে সরাসরি সাহায্য করে থাকি এবং প্রজেক্টের চাহিদা অনুযায়ী প্রি-প্রসেস করে দিই।"
    },
    {
      question: lang === "en" ? "Will my research data and ideas be kept confidential?" : "আমার প্রজেক্টের আইডিয়া ও ডাটা কী নিরাপদ থাকবে?",
      answer: lang === "en"
        ? "Absolutely. We maintain strict NDA-level confidentiality. Your research, codes, datasets, and intellectual ideas are 100% yours, and we will never share or publish them."
        : "অবশ্যই। আমরা কঠোর গোপনীয়তা বজায় রাখি। আপনার রিসার্চ আইডিয়া, ডাটা এবং কোডিং ফাইল ১০০% আপনার সম্পত্তি থাকবে এবং আমরা এটি কোথাও শেয়ার বা পাবলিশ করব না।"
    },
    {
      question: lang === "en" ? "Do you write the code from scratch or use templates?" : "আপনারা কি কোড স্ক্র্যাচ থেকে লেখেন নাকি টেমপ্লেট ব্যবহার করেন?",
      answer: lang === "en"
        ? "We develop custom, hybrid architectures specifically tailored to your problem statement. This ensures technical novelty, high-performance results, and zero plagiarism."
        : "আমরা আপনার প্রজেক্টের প্রবলেম স্টেটমেন্টের ওপর ভিত্তি করে সম্পূর্ণ স্ক্র্যাচ থেকে কাস্টম এবং হাইব্রিড আর্কিটেকচার কোড ডেভেলপ করি, যা কাজের নোবেলটি এবং জিরো প্লেজিয়ারিজম নিশ্চিত করে।"
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: lang === "en"
        ? "The amount of stress I had regarding the defense was overwhelming, but the way your team handled the entire project was simply amazing. Thank you so much!"
        : "ডিফেন্স নিয়ে যে পরিমাণ মানসিক চাপে ছিলাম, আপনারা পুরো প্রজেক্টটি যেভাবে সুন্দর করে হ্যান্ডেল করেছেন তার জন্য অসংখ্য ধন্যবাদ।",
      author: lang === "en" ? "MD. Rakib & Fahim" : "এমডি. রাকিব ও ফাহিম",
      details: lang === "en" ? "FYDP Student" : "FYDP স্টুডেন্ট"
    },
    {
      id: 2,
      quote: lang === "en"
        ? "The presentation went flawlessly! I explained everything so clearly that the external examiners didn't even ask a single question. Approved instantly!"
        : "প্রেজেন্টেশন দুর্দান্ত হয়েছে! সব কিছু এতো গুছিয়ে বুঝিয়ে দিয়েছিলাম যে এক্সটার্নাল স্যাররা কোনো প্রশ্নই করেননি। একবারে অ্যাপ্রুভড!",
      author: lang === "en" ? "Sanjida Rahman" : "সানজিদা রহমান",
      details: lang === "en" ? "FYDP Student" : "FYDP স্টুডেন্ট"
    },
    {
      id: 3,
      quote: lang === "en"
        ? "Alhamdulillah, our defense was yesterday. Everything went perfectly, and the panel highly praised our core AI research approach."
        : "আলহামদুলিল্লাহ, গতকাল আমাদের ডিফেন্স ছিল। সবকিছু খুব ভালোভাবে সম্পন্ন হয়েছে এবং প্যানেলের সবাই আমাদের রিসার্চ অ্যাপ্রোচের অনেক প্রশংসা করেছেন।",
      author: lang === "en" ? "Imran & Sabbir" : "ইমরান ও সাব্বির",
      details: lang === "en" ? "FYDP Student" : "FYDP স্টুডেন্ট"
    },
    {
      id: 4,
      quote: lang === "en"
        ? "Thank you so much for guiding us like an elder brother throughout this entire thesis journey. Your proper help made this possible."
        : "বড় ভাইয়ের মতো পুরো থিসিস জার্নিতে আমাদের প্রপার গাইডলাইন দেওয়ার জন্য অসংখ্য ধন্যবাদ।",
      author: lang === "en" ? "S. Hasan" : "এস. হাসান",
      details: lang === "en" ? "FYDP Student" : "FYDP স্টুডেন্ট"
    },
    {
      id: 5,
      quote: lang === "en"
        ? "The defense was excellent! The panel asked the exact questions you prepared us for during our live mock defense sessions."
        : "ডিফেন্স অনেক ভালো হয়েছে ভাইয়া! আপনারা মক-ডিফেন্সে যেভাবে বলেছিলেন, ঠিক সেভাবেই প্রশ্ন করেছে।",
      author: lang === "en" ? "Farhana & Tisha" : "ফারহানা ও তিশা",
      details: lang === "en" ? "FYDP Student" : "FYDP স্টুডেন্ট"
    },
    {
      id: 6,
      quote: lang === "en"
        ? "Finally got the approval! I was able to face the defense panel with complete confidence, all thanks to your live guidelines and help."
        : "ফাইনালি অ্যাপ্রুভাল পেয়েছি ভাইয়া! আপনাদের হেল্প আর লাইভ গাইডলাইনের কারণে খুব কনফিডেন্টলি ডিফেন্স দিতে পেরেছিলাম।",
      author: lang === "en" ? "Nafis M." : "নাফিস এম.",
      details: lang === "en" ? "FYDP Student" : "FYDP স্টুডেন্ট"
    }
  ];

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-red-500 selection:text-white ${lang === "en" ? inter.className : hindSiliguri.className}`}>
      {/* 1. Header (Navbar) */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo - Constrained inside h-20 navbar */}
          <div className="flex items-center h-full">
            <a href="#" className="flex items-center h-full">
              <Image
                src="/logo.png"
                alt="Alpha Research Solution Logo"
                width={210}
                height={53}
                className="h-[52px] sm:h-14 w-auto object-contain py-1 transition-transform duration-300 hover:scale-102"
                priority
              />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className={`hidden md:flex space-x-8 lg:space-x-10 ${textFont}`}>
            <a href="#" className="text-sm font-semibold text-slate-800 hover:text-red-600 transition-colors duration-200 relative group py-2">
              {lang === "en" ? "Home" : "হোম"}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#services" className="text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors duration-200 relative group py-2">
              {lang === "en" ? "Services" : "সার্ভিস ও প্রাইসিং"}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#workflow" className="text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors duration-200 relative group py-2">
              {lang === "en" ? "Workflow" : "মেথডোলজি"}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#choose-us" className="text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors duration-200 relative group py-2">
              {lang === "en" ? "Why Choose Us" : "কেন আমরা"}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#testimonials" className="text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors duration-200 relative group py-2">
              {lang === "en" ? "Testimonials" : "রিভিউ"}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#faq" className="text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors duration-200 relative group py-2">
              {lang === "en" ? "FAQ" : "জিজ্ঞাসিত প্রশ্ন"}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Language Toggle & Desktop Right Button */}
          <div className={`hidden md:flex items-center space-x-4 ${textFont}`}>
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              type="button"
              className="inline-flex items-center justify-center px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:text-red-600 hover:border-red-600 bg-white shadow-sm transition-all duration-200 cursor-pointer"
            >
              {lang === "en" ? "বাং" : "EN"}
            </button>
            
            <a
              href="https://wa.me/8801405562685?text=Hello%20Alpha%20Research%20Solution%2C%20I%20need%20some%20guidance%20for%20my%20final%20year%20ML%2FDL%20thesis.%20Can%20we%20schedule%20a%20free%20consultation%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-white bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              {lang === "en" ? "Get Started" : "শুরু করুন"}
            </a>
          </div>

          {/* Hamburger Menu Toggle & Mobile Language Toggle */}
          <div className={`md:hidden flex items-center space-x-2 ${textFont}`}>
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              type="button"
              className="inline-flex items-center justify-center px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:text-red-600 bg-white shadow-sm transition-colors cursor-pointer"
            >
              {lang === "en" ? "বাং" : "EN"}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-slate-200 bg-white ${textFont} ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 shadow-inner">
            <a
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-900 hover:bg-slate-50 hover:text-red-600 transition-colors"
            >
              {lang === "en" ? "Home" : "হোম"}
            </a>
            <a
              href="#services"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors"
            >
              {lang === "en" ? "Services" : "সার্ভিস ও প্রাইসিং"}
            </a>
            <a
              href="#workflow"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors"
            >
              {lang === "en" ? "Workflow" : "মেথডোলজি"}
            </a>
            <a
              href="#choose-us"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors"
            >
              {lang === "en" ? "Why Choose Us" : "কেন আমরা"}
            </a>
            <a
              href="#testimonials"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors"
            >
              {lang === "en" ? "Testimonials" : "রিভিউ"}
            </a>
            <a
              href="#faq"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors"
            >
              {lang === "en" ? "FAQ" : "জিজ্ঞাসিত প্রশ্ন"}
            </a>
            <div className="pt-2 px-3">
              <a
                href="https://wa.me/8801405562685?text=Hello%20Alpha%20Research%20Solution%2C%20I%20need%20some%20guidance%20for%20my%20final%20year%20ML%2FDL%20thesis.%20Can%20we%20schedule%20a%20free%20consultation%3F"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-md text-center"
              >
                {lang === "en" ? "Get Started" : "শুরু করুন"}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-28 bg-white">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>
        <div className="absolute -top-40 right-0 -z-10 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-60 -left-20 -z-10 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col text-center lg:text-left">
              <div className={`inline-flex items-center self-center lg:self-start gap-2 bg-red-50 text-red-700 border border-red-100 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-sm ${textFont}`}>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                {lang === "en" ? "Now Booking for Final Year Semesters" : "ফাইনাল ইয়ার সেমিস্টারের বুকিং চলছে"}
              </div>

              <h1 className={`${headingFont} ${lang === "en" ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl" : "text-3xl md:text-4xl lg:text-5xl"} font-extrabold tracking-tight text-slate-900 leading-snug`}>
                {lang === "en" ? (
                  <>
                    Stress-Free{" "}
                    <span className="text-red-600 bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
                      ML & DL Thesis
                    </span>{" "}
                    Support for Final Year Students.
                  </>
                ) : (
                  <>
                    ফাইনাল ইয়ারের থিসিস নিয়ে চিন্তায় আছেন? প্রোপোজাল থেকে ফাইনাল ডিফেন্স—আপনার{" "}
                    <span className="text-red-600 bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
                      ML ও DL প্রজেক্টের
                    </span>{" "}
                    পুরো দায়িত্ব এবার আমাদের।
                  </>
                )}
              </h1>

              <p className={`mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed ${textFont}`}>
                {lang === "en"
                  ? "From data preprocessing to hybrid model development and university-standard report writing—we provide end-to-end expert support for an A+ grade."
                  : "ডাটা প্রি-প্রসেসিং, হাইব্রিড মডেল ডেভেলপমেন্ট থেকে শুরু করে একদম ইউনিভার্সিটি স্ট্যান্ডার্ড রিপোর্ট রাইটিং পর্যন্ত—এ-প্লাস (A+) গ্রেড নিশ্চিত করতে আমরা দিচ্ছি পুরোপুরি এন্ড-টু-এন্ড মেন্টরশিপ সাপোর্ট।"}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center">
                <a
                  href="https://wa.me/8801405562685?text=Hello%20Alpha%20Research%20Solution%2C%20I%20need%20some%20guidance%20for%20my%20final%20year%20ML%2FDL%20thesis.%20Can%20we%20schedule%20a%20free%20consultation%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-[0_10px_25px_-5px_rgba(220,38,38,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(220,38,38,0.6)] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 text-center ${textFont}`}
                >
                  {lang === "en" ? "Book Free Consultation" : "ফ্রি কনসালটেশন বুক করুন"}
                </a>
                
                <div className="relative inline-block w-full sm:w-auto mt-2 sm:mt-0">
                  <a
                    href="https://wa.me/8801405562685?text=Hi%2C%20I%20want%20to%20claim%20the%20৳1000%20discount%20for%20the%20Full%20Project%20Solution.%20Is%20the%20offer%20still%20available%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center px-8 py-4 border-2 border-red-600 text-base font-bold rounded-xl text-red-600 bg-transparent hover:bg-red-50 active:bg-red-100 transition-all duration-300 transform hover:-translate-y-0.5 text-center ${textFont}`}
                  >
                    {lang === "en" ? "Claim ৳1000 Discount" : "৳১০০০ ছাড় লুফে নিন (প্রথম ৩ জন)"}
                  </a>
                  <span className={`absolute -top-3.5 right-4 sm:-right-2 bg-red-600 text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full shadow-md animate-pulse border border-white tracking-wider uppercase z-10 ${textFont}`}>
                    {lang === "en" ? "Only 2 Spots Left!" : "মাত্র ২টি সিট ফাঁকা!"}
                  </span>
                </div>
              </div>

              <div className={`mt-10 pt-8 border-t border-slate-100 grid grid-cols-3 gap-4 text-center lg:text-left max-w-lg mx-auto lg:mx-0 ${textFont}`}>
                <div>
                  <div className={`${headingFont} text-2xl sm:text-3xl font-extrabold text-slate-900 leading-none`}>100%</div>
                  <div className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-wider mt-2">
                    {lang === "en" ? "Plagiarism Free" : "প্লেজিয়ারিজম ফ্রী"}
                  </div>
                </div>
                <div>
                  <div className={`${headingFont} text-2xl sm:text-3xl font-extrabold text-slate-900 leading-none`}>45+</div>
                  <div className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-wider mt-2">
                    {lang === "en" ? "Top Grades" : "এ-প্লাস গ্রেডস"}
                  </div>
                </div>
                <div>
                  <div className={`${headingFont} text-2xl sm:text-3xl font-extrabold text-slate-900 leading-none`}>A+</div>
                  <div className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-wider mt-2">
                    {lang === "en" ? "Target Success" : "টার্গেট এ+ গ্রেড"}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center animate-float">
              <div className="w-full max-w-md bg-slate-950 text-slate-200 rounded-3xl p-6 shadow-2xl border border-slate-800/80 relative overflow-hidden select-none">
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="flex gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-red-500"></span>
                      <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                      <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="text-xs text-slate-400 font-mono">model_training.py</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Active</span>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-2xl border border-slate-800/50 p-4 mb-6 relative">
                  <div className="text-xs text-slate-400 font-semibold mb-3">Proposed Hybrid Architecture</div>
                  <div className="flex items-center justify-between px-4 py-6 relative">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 40 40 L 130 20" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1.5" strokeDasharray="3" className="animate-[dash_5s_linear_infinite]" />
                      <path d="M 40 40 L 130 50" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1.5" />
                      <path d="M 40 40 L 130 80" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="1" />
                      <path d="M 40 80 L 130 50" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="1" />
                      <path d="M 40 80 L 130 80" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1.5" strokeDasharray="3" />
                      <path d="M 40 80 L 130 110" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1.5" />
                      <path d="M 140 20 L 230 40" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="1.5" />
                      <path d="M 140 50 L 230 40" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1.5" strokeDasharray="3" />
                      <path d="M 140 80 L 230 80" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="2" />
                      <path d="M 140 110 L 230 80" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1" />
                    </svg>

                    <div className="flex flex-col gap-6 relative z-10">
                      <div className="h-6 w-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-400">X1</div>
                      <div className="h-6 w-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-400">X2</div>
                    </div>

                    <div className="flex flex-col gap-3 relative z-10">
                      <div className="h-6 w-6 rounded-full bg-red-950 border border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] flex items-center justify-center text-[9px] font-bold text-red-400">H1</div>
                      <div className="h-6 w-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-400">H2</div>
                      <div className="h-6 w-6 rounded-full bg-red-950 border border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)] flex items-center justify-center text-[9px] font-bold text-red-400">H3</div>
                      <div className="h-6 w-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-400">H4</div>
                    </div>

                    {/* Output Layer */}
                    <div className="flex flex-col gap-8 relative z-10">
                      <div className="h-6 w-6 rounded-full bg-emerald-950 border border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] flex items-center justify-center text-[9px] font-bold text-emerald-400">Y1</div>
                      <div className="h-6 w-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-400">Y2</div>
                    </div>
                  </div>
                </div>

                {/* Training Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/80 rounded-xl border border-slate-800/80 p-3">
                    <div className="text-[10px] text-slate-500 font-mono">Epoch 184/200</div>
                    <div className="text-sm font-semibold font-mono text-slate-100 mt-1">Loss: 0.024</div>
                    <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                      <div className="bg-red-600 h-full rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  <div className="bg-slate-900/80 rounded-xl border border-slate-800/80 p-3">
                    <div className="text-[10px] text-slate-500 font-mono">Validation accuracy</div>
                    <div className="text-sm font-semibold font-mono text-emerald-400 mt-1">98.42%</div>
                    <div className="text-[9px] text-slate-500 mt-1 font-mono">SOTA Target met</div>
                  </div>
                </div>

                {/* Floating Academic Artifact Overlay */}
                <div className="absolute bottom-16 right-4 bg-white text-slate-900 rounded-xl p-3 shadow-xl border border-slate-200/80 flex items-center gap-3 animate-bounce max-w-[190px] duration-1000">
                  <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Thesis Report</div>
                    <div className="text-[11px] font-bold text-slate-800">Draft Approved ✓</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How We Work (Workflow) Section */}
      <section id="workflow" ref={workflowRef} className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden">
        {/* Soft background grid masks */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-50/50 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-100 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Headers */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className={`text-xs font-bold tracking-widest text-red-600 uppercase bg-red-50 px-3.5 py-1.5 rounded-full border border-red-100/60 ${textFont}`}>
              {lang === "en" ? "Methodology" : "মেথডোলজি"}
            </span>
            <h2 className={`${headingFont} text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mt-4 tracking-tight leading-snug`}>
              {lang === "en" ? "Our Research & Development Workflow" : "আমাদের রিসার্চ ও ডেভেলপমেন্ট ওয়ার্কফ্লো"}
            </h2>
            <p className={`text-base sm:text-lg text-slate-600 mt-4 leading-relaxed ${textFont}`}>
              {lang === "en"
                ? "We structure our consulting and support into a step-by-step rigorous methodology, guiding you seamlessly from initial ideation to your final defense."
                : "আমরা আমাদের সাপোর্ট ও কনসাল্টিং কার্যক্রমকে একটি পদ্ধতিগত ওয়ার্কফ্লোতে ভাগ করেছি, যা আপনাকে আইডিয়া জেনারেশন থেকে শুরু করে ফাইনাল ডিফেন্স পর্যন্ত নিখুঁতভাবে গাইড করবে।"}
            </p>
          </div>

          {/* Card Grid System */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {workflowSteps.map((stepItem, index) => {
              let gridClasses = "col-span-1";
              if (index < 3) {
                gridClasses = "col-span-1 lg:col-span-2";
              } else if (index === 3) {
                gridClasses = "col-span-1 md:col-span-1 lg:col-start-2 lg:col-span-2";
              } else if (index === 4) {
                gridClasses = "col-span-1 md:col-span-2 md:max-w-md md:mx-auto md:w-full lg:col-span-2 lg:max-w-none lg:mx-0";
              }

              return (
                <div
                  key={stepItem.step}
                  className={`transition-all duration-700 transform ${gridClasses} ${
                    workflowVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:shadow-slate-100 border border-slate-200/80 hover:border-red-200 transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden h-full flex flex-col justify-between">
                    <div>
                      {/* Interactive red glow strip on card hover */}
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-slate-100 group-hover:bg-red-600 transition-colors duration-300"></div>

                      {/* Step Icon Badge */}
                      <div className="inline-flex items-center justify-center p-3 rounded-xl bg-red-50 mb-5 border border-red-100/40 group-hover:bg-red-100/50 transition-colors duration-300">
                        {stepItem.icon}
                      </div>

                      {/* Card Sub-header & Title */}
                      <div className={`text-xs font-bold text-red-600 tracking-wider uppercase mb-1 ${textFont}`}>
                        {lang === "en" ? `Step ${stepItem.step}` : `ধাপ ${stepItem.step}`}
                      </div>
                      <h3 className={`${headingFont} text-xl sm:text-2xl font-extrabold text-slate-955 mb-2 leading-relaxed`}>
                        {stepItem.title}
                      </h3>
                      <h4 className={`text-sm font-semibold text-slate-500 mb-4 italic ${textFont}`}>
                        {stepItem.subtitle}
                      </h4>
                      <p className={`text-slate-600 text-sm sm:text-base leading-relaxed ${textFont}`}>
                        {stepItem.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Services & Pricing Section */}
      <section id="services" ref={servicesRef} className="py-20 sm:py-28 bg-white border-y border-slate-100 relative overflow-hidden">
        {/* Soft decorative elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-60"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className={`text-xs font-bold tracking-widest text-red-600 uppercase bg-red-50 px-3.5 py-1.5 rounded-full border border-red-100/60 ${textFont}`}>
              {lang === "en" ? "Services & Pricing" : "সার্ভিস ও প্রাইসিং"}
            </span>
            <h2 className={`${headingFont} text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mt-4 tracking-tight leading-snug`}>
              {lang === "en" ? "Invest in Your Academic Success" : "আপনার থিসিসের সঠিক প্যাকেজটি বেছে নিন"}
            </h2>
            <p className={`text-base sm:text-lg text-slate-600 mt-4 leading-relaxed ${textFont}`}>
              {lang === "en"
                ? "Choose the package that fits your thesis requirements. We offer a student-friendly milestone pre-payment plan."
                : "কাজের মান ও স্টুডেন্ট বাজেটের সামঞ্জস্য রেখেই আমাদের প্যাকেজগুলো তৈরি করা হয়েছে।"}
            </p>
          </div>

          {/* Visual 3-Phase Payment Flow */}
          <div className="max-w-5xl mx-auto mb-20 bg-slate-50/50 border border-slate-200/60 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="text-center mb-8">
              <h3 className={`${headingFont} text-lg sm:text-xl font-bold text-slate-900 leading-relaxed`}>
                {lang === "en" ? "Student-Friendly 3-Phase Payment Flow" : "৩-ধাপের মাইলস্টোন পেমেন্ট ফ্লো"}
              </h3>
              <p className={`text-xs sm:text-sm text-slate-500 mt-2 font-medium leading-relaxed ${textFont}`}>
                {lang === "en"
                  ? "Clear checkpoints mapped to your supervisor review timeline to ensure peace of mind."
                  : "একবারে বড় পেমেন্টের কোনো চাপ নেই! আপনাদের সুবিধার কথা ভেবেই আমাদের পেমেন্ট সিস্টেমকে ৩টি সহজ মাইলস্টোনে ভাগ করা হয়েছে। কাজ এগোবে, পেমেন্ট করবেন।"}
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-4">
              {/* Phase 1 */}
              <div className="flex-1 bg-white border border-slate-200/80 rounded-2xl p-6 relative overflow-hidden shadow-sm flex flex-col justify-between hover:border-red-200 transition-colors">
                <div className="absolute top-0 left-0 h-1 w-full bg-red-600"></div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="h-6 w-6 rounded-full bg-red-50 text-red-600 font-extrabold text-xs flex items-center justify-center border border-red-100">1</span>
                    <h4 className={`${headingFont} text-base font-bold text-slate-900 leading-snug`}>
                      {lang === "en" ? "Phase 1: Initial Deposit" : "ধাপ ১: ইনিশিয়াল ডিপোজিট"}
                    </h4>
                  </div>
                  <p className={`text-xs text-slate-600 leading-relaxed font-semibold ${textFont}`}>
                    {lang === "en"
                      ? "Pre-Payment to kickstart. Covers Literature Review, Data Collection & Preprocessing. Includes multiple updates."
                      : "কাজ শুরু করার জন্য পেমেন্ট। এর আওতায় লিটারেচার রিভিউ, ডাটা কালেকশন ও প্রি-প্রসেসিং সম্পন্ন করা হয়। কাজের রেগুলার আপডেট পাবেন।"}
                  </p>
                </div>
              </div>

              {/* Connecting Icon */}
              <div className="flex items-center justify-center py-1 lg:py-0">
                <svg className="w-6 h-6 text-red-500 transform rotate-90 lg:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Phase 2 */}
              <div className="flex-1 bg-white border border-slate-200/80 rounded-2xl p-6 relative overflow-hidden shadow-sm flex flex-col justify-between hover:border-red-200 transition-colors">
                <div className="absolute top-0 left-0 h-1 w-full bg-red-600"></div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="h-6 w-6 rounded-full bg-red-50 text-red-600 font-extrabold text-xs flex items-center justify-center border border-red-100">2</span>
                    <h4 className={`${headingFont} text-base font-bold text-slate-900 leading-snug`}>
                      {lang === "en" ? "Phase 2: Mid-Progress Demo" : "ধাপ ২: মিড-প্রগ্রেস ডেমো"}
                    </h4>
                  </div>
                  <p className={`text-xs text-slate-600 leading-relaxed font-semibold ${textFont}`}>
                    {lang === "en"
                      ? "Pre-Payment for Core AI phase. Covers Model Development, Evaluation & Live Code Walkthrough Meetings."
                      : "কোর এআই মডেলিং ধাপের জন্য পেমেন্ট। এর আওতায় মডেল ডিজাইন, হাইপারপ্যারামিটার টিউনিং এবং ওয়ান-টু-ওয়ান লাইভ মিটিংয়ে ডেমো দেখানো হয়।"}
                  </p>
                </div>
              </div>

              {/* Connecting Icon */}
              <div className="flex items-center justify-center py-1 lg:py-0">
                <svg className="w-6 h-6 text-red-500 transform rotate-90 lg:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Phase 3 */}
              <div className="flex-1 bg-white border border-slate-200/80 rounded-2xl p-6 relative overflow-hidden shadow-sm flex flex-col justify-between hover:border-red-200 transition-colors">
                <div className="absolute top-0 left-0 h-1 w-full bg-red-600"></div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="h-6 w-6 rounded-full bg-red-50 text-red-600 font-extrabold text-xs flex items-center justify-center border border-red-100">3</span>
                    <h4 className={`${headingFont} text-base font-bold text-slate-900 leading-snug`}>
                      {lang === "en" ? "Phase 3: Final Delivery" : "ধাপ ৩: ফাইনাল ডেলিভারি"}
                    </h4>
                  </div>
                  <p className={`text-xs text-slate-600 leading-relaxed font-semibold ${textFont}`}>
                    {lang === "en"
                      ? "Pre-Payment for closure. Covers LaTeX Report, PPT Slides, Mock Defense Prep & Final Handover."
                      : "প্রজেক্ট ক্লোজ করার জন্য পেমেন্ট। এর আওতায় LaTeX রিপোর্ট রাইটিং, প্রেজেন্টেশন স্লাইড, মক ডিফেন্স প্রিপারেশন এবং ফাইনাল ফাইল হ্যান্ডওভার অন্তর্ভুক্ত।"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => {
              return (
                <div
                  key={plan.id}
                  className={`transition-all duration-750 transform ${
                    servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div
                    className={`h-full flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 relative ${
                      plan.isHighlighted
                        ? "border-2 border-red-600 bg-white shadow-2xl lg:scale-105 z-10"
                        : "border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-lg shadow-sm"
                    }`}
                  >
                    {/* Highlight Badge */}
                    {plan.isHighlighted && plan.badgeText && (
                      <span className={`absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-[9px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md border border-white whitespace-nowrap animate-pulse ${textFont}`}>
                        {plan.badgeText}
                      </span>
                    )}

                    {/* Plan Details */}
                    <div>
                      <h3 className={`${headingFont} text-lg sm:text-xl font-bold text-slate-900 mb-2 leading-relaxed`}>{plan.title}</h3>
                      <p className={`text-xs text-slate-500 mb-6 font-medium leading-relaxed ${textFont}`}>{plan.description}</p>
                      
                      {/* Price Section */}
                      <div className="flex items-baseline mb-6 pb-6 border-b border-slate-100">
                        <span className={`${headingFont} text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-none`}>{plan.price}</span>
                        <span className={`text-xs text-slate-500 font-semibold ml-2 ${textFont}`}>
                          {lang === "en" ? "/ flat package rate" : "/ ফ্ল্যাট প্যাকেজ রেট"}
                        </span>
                      </div>

                      {/* Feature List */}
                      <ul className={`space-y-4 mb-8 ${textFont}`}>
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-sm text-slate-600 leading-snug">
                            <svg className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className={`${textFont}`}>
                      <a
                        href={plan.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl text-sm font-bold transition-all duration-300 transform hover:-translate-y-0.5 text-center ${
                          plan.isHighlighted
                            ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200/50 active:bg-red-800"
                            : "bg-slate-100 hover:bg-red-50 text-slate-800 hover:text-red-600 border border-slate-200 hover:border-red-200 active:bg-red-100"
                        }`}
                      >
                        {plan.buttonText}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtle Primary Data Disclaimer */}
          <div className={`text-center mt-12 max-w-3xl mx-auto ${textFont}`}>
            <p className={`text-sm text-gray-500 italic mt-6 leading-relaxed ${textFont}`}>
              {lang === "en"
                ? "* Note: Primary research data should ideally be provided by the student. For complex requirements or custom datasets, please contact us for a detailed project consultation."
                : "* নোট: প্রাইমারি রিসার্চ ডাটা সাধারণত স্টুডেন্টকে প্রদান করতে হবে। জটিল রিকোয়ারমেন্টস বা কাস্টম ডাটা কালেকশনের জন্য আমাদের সাথে বিস্তারিত প্রজেক্ট কনসালটেশনের জন্য যোগাযোগ করুন।"}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section id="choose-us" ref={chooseUsRef} className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden">
        {/* Soft visual gradients */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.02)_0%,transparent_70%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className={`text-xs font-bold tracking-widest text-red-600 uppercase bg-red-50 px-3.5 py-1.5 rounded-full border border-red-100/60 ${textFont}`}>
              {lang === "en" ? "Why Choose Us" : "কেন আমাদের বেছে নেবেন"}
            </span>
            <h2 className={`${headingFont} text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mt-4 tracking-tight leading-snug`}>
              {lang === "en" ? "Research Support Built on Absolute Trust" : "সম্পূর্ণ বিশ্বস্ততার ওপর নির্মিত রিসার্চ সাপোর্ট"}
            </h2>
            <p className={`text-base sm:text-lg text-slate-600 mt-4 leading-relaxed ${textFont}`}>
              {lang === "en"
                ? "Missing out on our thesis support means taking unnecessary stress. Here is how we guide you seamlessly to graduation with complete peace of mind."
                : "থিসিসের এই অল্প সময়ে ভুল সিদ্ধান্ত আপনার গ্র্যাজুয়েশন আটকে দিতে পারে। আমরা শুধু কোড বা রিপোর্ট ডেলিভারি দিই না, লাইভ মিটিংয়ের মাধ্যমে পুরো প্রজেক্ট বুঝিয়ে দিই, সুপারভাইজরের যেকোনো ফিডব্যাক সলভ করি এবং আপনাকে ডিফেন্সের জন্য ১০০% প্রস্তুত করি।"}
            </p>
          </div>

          {/* Perfect 3x2 Grid Layout on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chooseUsPoints.map((point, index) => {
              return (
                <div
                  key={point.title}
                  className={`transition-all duration-700 transform ${
                    chooseUsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-slate-100 hover:border-red-200 transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden h-full flex flex-col justify-between">
                    <div>
                      {/* Hover top accent */}
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-slate-100 group-hover:bg-red-600 transition-colors duration-300"></div>

                      {/* Icon */}
                      <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-red-50 border border-red-100/30 group-hover:bg-red-100/50 transition-colors duration-300 mb-6">
                        {point.icon}
                      </div>

                      {/* Text details */}
                      <h3 className={`${headingFont} text-lg sm:text-xl font-bold text-slate-955 mb-1 leading-relaxed`}>{point.title}</h3>
                      <h4 className={`text-xs font-semibold text-slate-400 mb-4 tracking-wide uppercase ${textFont}`}>{point.subtitle}</h4>
                      <p className={`text-slate-600 text-sm sm:text-base leading-relaxed ${textFont}`}>{point.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden border-b border-slate-100">
        {/* Soft background grid highlights */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-50/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-100 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className={`text-xs font-bold tracking-widest text-red-600 uppercase bg-red-50 px-3.5 py-1.5 rounded-full border border-red-100/60 ${textFont}`}>
              {lang === "en" ? "Testimonials" : "টেস্টিমোনিয়াল"}
            </span>
            <h2 className={`${headingFont} text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mt-4 tracking-tight leading-snug`}>
              {lang === "en" ? "What Our Students Say" : "শিক্ষার্থীদের রিভিউ ও সাফল্য"}
            </h2>
            <p className={`text-base sm:text-lg text-slate-600 mt-4 leading-relaxed ${textFont}`}>
              {lang === "en"
                ? "Hear from students who achieved top grades and cleared their defenses with confidence under our expert mentorship."
                : "আমাদের গাইডলাইন ও ওয়ান-টু-ওয়ান সাপোর্টে এ-প্লাস গ্রেড পেয়ে থিসিস সম্পন্ন করা শিক্ষার্থীদের বাস্তব অভিজ্ঞতা।"}
            </p>
          </div>

          {/* Testimonial Cards Slider */}
          <div className={`relative w-full transition-all duration-1000 transform ${
            testimonialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            {/* Left and Right Gradient Fades */}
            <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent z-25 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent z-25 pointer-events-none"></div>

            {/* Left Arrow Button */}
            <button
              onClick={scrollLeft}
              type="button"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-red-600 shadow-md hover:shadow-lg border border-slate-100 hover:border-red-200 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none cursor-pointer"
              aria-label="Scroll left"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={scrollRight}
              type="button"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-red-600 shadow-md hover:shadow-lg border border-slate-100 hover:border-red-200 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none cursor-pointer"
              aria-label="Scroll right"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Scrolling container */}
            <div
              ref={testimonialSliderRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-6 px-12 md:px-16 pb-6 pt-4"
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="w-[300px] sm:w-[350px] min-w-[300px] md:min-w-[350px] snap-center flex-shrink-0"
                >
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-300 transform hover:-translate-y-1.5 relative overflow-hidden h-full flex flex-col justify-between">
                    <div>
                      {/* Faint Quote Background Mark */}
                      <span className="absolute top-2 left-4 text-slate-100 text-8xl font-serif select-none pointer-events-none leading-none">
                        &ldquo;
                      </span>

                      {/* Verified Badge */}
                      <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold mb-4 relative z-10">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{lang === "en" ? "Verified Student" : "ভেরিফাইড স্টুডেন্ট"}</span>
                      </div>

                      {/* Quote Text */}
                      <p className={`text-slate-700 text-sm sm:text-base leading-relaxed relative z-10 ${textFont}`}>
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col relative z-10">
                      <span className={`${headingFont} text-sm font-bold text-slate-900`}>
                        {item.author}
                      </span>
                      <span className={`text-xs text-slate-500 font-semibold mt-0.5 ${textFont}`}>
                        {item.details}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section id="faq" ref={faqRef} className="py-20 sm:py-28 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className={`text-xs font-bold tracking-widest text-red-600 uppercase bg-red-50 px-3.5 py-1.5 rounded-full border border-red-100/60 ${textFont}`}>
              {lang === "en" ? "Frequently Asked Questions" : "সাধারণ জিজ্ঞাসিত প্রশ্নাবলী"}
            </span>
            <h2 className={`${headingFont} text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight leading-snug`}>
              {lang === "en" ? "Have Questions? We Have Answers" : "থিসিস নিয়ে মনে প্রশ্ন আছে? জেনে নিন"}
            </h2>
            <p className={`text-base sm:text-lg text-slate-600 mt-4 leading-relaxed ${textFont}`}>
              {lang === "en"
                ? "Find answers to the most common questions regarding our ML/DL thesis consulting services."
                : "আমাদের কনসাল্টিং সার্ভিস এবং বিভিন্ন সাহায্য সম্পর্কে সচরাচর জিজ্ঞাসিত প্রশ্নগুলোর উত্তর নিচে দেয়া হলো।"}
            </p>
          </div>

          {/* Accordion List */}
          <div className={`space-y-4 transition-all duration-750 transform ${
            faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200/80 rounded-2xl bg-slate-50/50 overflow-hidden transition-all duration-300 hover:border-red-200"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    type="button"
                    className={`w-full flex items-center justify-between p-6 text-left font-bold font-serif text-slate-900 hover:text-red-600 transition-colors ${headingFont}`}
                  >
                    <span className="text-base sm:text-lg pr-4">{faq.question}</span>
                    <span className={`flex-shrink-0 h-6 w-6 rounded-full border border-slate-300 flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? "transform rotate-180 border-red-500 text-red-600 bg-red-50" : "text-slate-500"
                    }`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[300px] border-t border-slate-200 bg-white" : "max-h-0 pointer-events-none"
                    }`}
                  >
                    <div className={`p-6 text-slate-600 text-sm sm:text-base leading-relaxed border-l-4 border-red-600 ${textFont}`}>
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Professional Footer */}
      <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-slate-900">
            {/* Logo/Tagline column */}
            <div className="md:col-span-5 flex flex-col">
              {/* Footer Logo using strict footer path - NO generated placeholders */}
              <div className="relative mb-2">
                <Image
                  src="/logo_footer.png"
                  alt="Footer Logo"
                  width={80}
                  height={80}
                  className="mb-4 w-12 h-12 sm:w-16 sm:h-16 object-contain"
                />
              </div>
              <a href="#" className="flex items-center mb-4">
                <span className={`text-xl sm:text-2xl font-black font-serif tracking-tight text-white leading-none ${headingFont}`}>
                  ALPHA RESEARCH <span className="text-red-600">SOLUTION</span>
                </span>
              </a>
              <p className={`text-sm text-slate-400 max-w-sm leading-relaxed mb-6 font-medium ${textFont}`}>
                {lang === "en"
                  ? "Your dedicated ML/DL research partners. Providing expert-level thesis consulting, code modeling, LaTeX documentation, and slide preparation to ensure a stellar graduation grade."
                  : "আপনার বিশ্বস্ত ML/DL রিসার্চ পার্টনার। প্রফেশনাল থিসিস কনসালটিং, কোড মডেলিং, LaTeX ডকুমেন্টেশন ও ডিফেন্স প্রিপারেশন সাপোর্ট।"}
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                {lang === "en" ? "Quick Links" : "কুইক লিংকস"}
              </h4>
              <ul className={`space-y-3 text-sm font-semibold ${textFont}`}>
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    {lang === "en" ? "Home" : "হোম"}
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-red-500 transition-colors">
                    {lang === "en" ? "Services & Pricing" : "সার্ভিস ও প্রাইসিং"}
                  </a>
                </li>
                <li>
                  <a href="#workflow" className="hover:text-red-500 transition-colors">
                    {lang === "en" ? "Methodology Workflow" : "মেথডোলজি ওয়ার্কফ্লো"}
                  </a>
                </li>
                <li>
                  <a href="#choose-us" className="hover:text-red-500 transition-colors">
                    {lang === "en" ? "Why Choose Us" : "কেন আমাদের বেছে নেবেন"}
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-red-500 transition-colors">
                    {lang === "en" ? "FAQs" : "সচরাচর প্রশ্নাবলী"}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact details column */}
            <div className="md:col-span-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                {lang === "en" ? "Contact Information" : "যোগাযোগের ঠিকানা"}
              </h4>
              <ul className={`space-y-4 text-sm font-semibold ${textFont}`}>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <span className="block text-slate-400 text-xs uppercase mb-0.5">WhatsApp Chat</span>
                    <a
                      href="https://wa.me/8801405562685"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-red-500 transition-colors text-slate-200"
                    >
                      +880 1405-562685
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <span className="block text-slate-400 text-xs uppercase mb-0.5">Email Address</span>
                    <a
                      href="mailto:solution.alpharesearch@gmail.com"
                      className="hover:text-red-500 transition-colors text-slate-200"
                    >
                      solution.alpharesearch@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <span className="block text-slate-400 text-xs uppercase mb-0.5">Office Address</span>
                    <span className="text-slate-200">Mirpur-1, Dhaka, Bangladesh</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright banner */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500">
            <p className="leading-relaxed">&copy; 2026 Alpha Research Solution. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
