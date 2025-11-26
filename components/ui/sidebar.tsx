import { getRole } from "@/utils/roles";
import { Bell, CalendarCheck, Layout, LayoutDashboard, List, ListOrdered, Logs, LucideIcon, Pill, Receipt, Settings, SquareActivity, User, UserRound, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const ACCESS_LEVELS_ALL = ["patient", "doctor", "nurse", "admin"];

export const SidebarIcon = ({Icon}: {Icon: LucideIcon}) => {
    return <Icon className="size-6 lg:size-5"/>;
};

export const Sidebar = async () => {
    const role = await getRole();

    const SIDEBAR_LINKS = [
        {
            label: "Menu",
            links: [
                {
                    name: "Dashboard",
                    href: `/${role}`,
                    access: ACCESS_LEVELS_ALL,
                    icon: LayoutDashboard,
                },
                {
                    name: "Profile",
                    href: "/patient/self",
                    access: ["patient"],
                    icon: User,
                }
            ],
        },
        {
            label: "Manage",
            links: [
                {
                    name: "Users",
                    href: "/record/users",
                    access: ["admin"],
                    icon: Users,
                },
                {
                    name: "Doctors",
                    href: "/record/doctors",
                    access: ["admin"],
                    icon: User,
                },
                {
                    name: "Staff",
                    href: "/record/staff",
                    access: ["admin", "doctor"],
                    icon: UserRound,
                },
                {
                    name: "Patients",
                    href: "/record/patients",
                    access: ["admin", "doctor", "nurse"],
                    icon: UserRound,
                },
                {
                    name: "Appointments",
                    href: "/record/appointments",
                    access: ["admin", "doctor", "nurse"],
                    icon: ListOrdered,
                },
                {
                    name: "Medical Records",
                    href: "/record/medical-records",
                    access: ["admin", "doctor", "nurse"],
                    icon: SquareActivity,
                },
                {
                    name: "Billing Overview",
                    href: "/record/billing",
                    access: ["admin", "doctor"],
                    icon: Receipt,
                },
                {  
                    name: "Patient Management",
                    href: "/record/patient-management",
                    access: ["nurse"],
                    icon: Users,
                },
                {
                    name: "Administer Medications",
                    href: "/record/administer-medications",
                    access: ["admin", "doctor", "nurse"],
                    icon: Pill,
                },
                {
                    name: "My Appointments",
                    href: "/patient/appointments",
                    access: ["patient"],
                    icon: CalendarCheck,
                },
                {
                    name: "Records",
                    href: "/patient/records",
                    access: ["patient"],
                    icon: List,
                },
                {
                    name: "Prescriptions",
                    href: "/patient/prescriptions",
                    access: ["patient"],
                    icon: Pill
                },
                {
                    name: "Billing",
                    href: "/patient/billing",
                    access: ["patient"],
                    icon: Receipt,
                },
            ],
        },
        {
            label: "System",
            links: [
                {
                    name: "Notifications",
                    href: "/notifications",
                    access: ACCESS_LEVELS_ALL,
                    icon: Bell,
                },
                {
                    name: "Audit Logs",
                    href: "/admin/audit-logs",
                    access: ["admin"],
                    icon: Logs,
                },
                {
                    name: "Settings",
                    href: "/admin/system-settings",
                    access: ["admin"],
                    icon: Settings,
                },
            ],
        },
    ];

    // Filter links based on user role
    const filteredSections = SIDEBAR_LINKS.map(section => ({
        ...section,
        links: section.links.filter(link => 
            role && link.access.includes(role)
        )
    })).filter(section => section.links.length > 0);

    return (
        <aside className="w-64 bg-blue-900 text-white min-h-screen sticky top-0">
            {/* Logo/Header */}
            <div className="p-6">
                <h2 className="text-2xl font-bold">Ekwuety Health</h2>
                <p className="text-sm text-blue-200 capitalize">{role} Portal</p>
            </div>

            {/* Navigation */}
            <nav className="px-3">
                {filteredSections.map((section, sectionIdx) => (
                    <div key={sectionIdx} className="mb-6">
                        <h3 className="px-3 mb-2 text-xs font-semibold text-blue-300 uppercase tracking-wider">
                            {section.label}
                        </h3>
                        <div className="space-y-1">
                            {section.links.map((link, linkIdx) => (
                                <Link
                                    key={linkIdx}
                                    href={link.href}
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-100 hover:bg-blue-800 hover:text-white transition-colors group"
                                >
                                    <SidebarIcon Icon={link.icon} />
                                    <span className="text-sm font-medium">{link.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
};