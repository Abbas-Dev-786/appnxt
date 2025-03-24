
import Banner from "../../shared/Banner/Banner"
import CustomSection from "../../shared/CustomSection/CustomSection"
import Footer from "../../shared/Footer/Footer"
import Header from "../../shared/Header/Header"
import TechStack from "../../shared/Technology/TechStack"
import Cards from "./Cards"

const DigitalBankingSolution = () => {

    const data = [
        {
            heading: "Why AppNXT?",
            description: "Our solutions and ability to simplify banking processes and fintech bring immense value to the financial world.",
            image: "/assets/img/Sol-5.svg"
        },
        {
            heading: "AppNXT CORE",
            subtitle: "End-to-End Core Banking Solution",
            description: "Ensure your bank’s needs are met with fully integrated modules. Reduce manual efforts while boosting efficiency with our solution, optimizing workflows and processes.",
            image: "/assets/img/Sol-9.svg"
        },
        {
            heading: "AppNXT LUNA",
            subtitle: "Hassle-Free Loan Origination & Management Solution",
            description: "We streamline every phase of loan origination and management for financial institutions. Our solution accommodates numerous loan products across diverse portfolios.",
            image: "/assets/img/Sol-2.svg"
        },
        {
            heading: "AppNXT LEGAL",
            subtitle: "Legal Recovery Solution",
            description: "Our solution helps banks and financial institutions monitor and track Non-Performing Assets (NPAs), providing alerts to prevent loans from turning into NPAs.",
            image: "/assets/img/Sol-8.svg"
        },
        {
            heading: "AppNXT AMLOR",
            subtitle: "Anti-Money Laundering Solution",
            description: "Banks can monitor transactions using intelligent detection tools, watch list filtering, alert investigations, regulatory reporting, and management reporting. Designed for compliance with government regulations and due diligence.",
            image: "/assets/img/Sol-7.svg"
        },
        {
            heading: "AppNXT CONNECT",
            subtitle: "Financial Transaction Switch",
            description: "Seamlessly integrates with core banking systems, enabling card-based transactions across ATMs, POS systems, and e-commerce platforms.",
            image: "/assets/img/Sol-5.svg"
        },
        {
            heading: "AppNXT MOBICONNECT",
            subtitle: "Bank on the Go",
            description: "A mobile payment switch that enables customers to manage their finances anytime, anywhere, enhancing the customer experience.",
            image: "/assets/img/Sol-6.svg"
        },
        {
            heading: "AppNXT INET",
            subtitle: "Online Banking Solution",
            description: "Our user-friendly internet banking solution empowers banks to enhance their customers’ banking journey. It enables seamless online transactions and account management.",
            image: "/assets/img/Sol-7.svg"
        },
        {
            heading: "AppNXT UPI",
            subtitle: "Real-Time Payment Solution",
            description: "The AppNXT UPI platform offers users a universal mobile interface and API integration directly connected to NPCI. A streamlined, reliable payment system utilizing virtual addresses for seamless money transfers.",
            image: "/assets/img/Sol-8.svg"
        },
        {
            heading: "AppNXT BBPS",
            subtitle: "Bill Payment Interface",
            description: "A centralized, interoperable solution that connects with Bharat BillPay, allowing customers to securely pay various utility bills like electricity, water, gas, telephone, and recharges.",
            image: "/assets/img/Sol-9.svg"
        },
        {
            heading: "AppNXT AEPS",
            subtitle: "Fund Transfers Using Aadhaar",
            description: "An Aadhaar-based payment solution connecting with NPCI’s AEPS, enabling transfers between bank accounts using Aadhaar-enabled devices. Hosted within the bank’s financial transaction switch and integrated with their Core Banking System.",
            image: "/assets/img/Sol-10.svg"
        },
        {
            heading: "AppNXT VideoKYC",
            subtitle: "A Better Way to Verify Your Customer",
            description: "Achieve a fully digitalized customer onboarding process with instant KYC completion using Aadhaar-based authentication and advanced facial recognition technology.",
            image: "/assets/img/Sol-2.svg"
        },
        {
            heading: "WhatsApp Banking Assistant",
            subtitle: "Banking Services on WhatsApp",
            description: "Deliver personalized banking support on WhatsApp via the WhatsApp Business API. Organize daily operations such as balance summaries, transaction histories, and money transfers efficiently.",
            image: "/assets/img/Sol-12.svg"
        },
        {
            heading: "AppNXT AA - TSP",
            subtitle: "Certified TSP for AA",
            description: "Our TSP solution for the Account Aggregator (AA) ecosystem ensures seamless integration for Financial Information Users (FIU) and Financial Information Providers (FIP) within the AA framework.",
            image: "/assets/img/Sol-10.svg"
        },
    ]

  return (
    <>
        <Header />
        <Banner heading={'Digital Banking Solutions'} bgURL={'/assets/img/about-banner.svg'} />
        <Cards data={data}/>
        <TechStack />
        <CustomSection />
        <Footer />
    </>
  )
}

export default DigitalBankingSolution