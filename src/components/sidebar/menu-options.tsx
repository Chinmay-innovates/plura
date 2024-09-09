"use client";
import {
	AgencySidebarOption,
	SubAccount,
	SubAccountSidebarOption,
} from "@prisma/client";

interface MenuOptionsProps {
	defaultOpen?: boolean;
	subAccounts: SubAccount[];
	sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[];
	sidebarLogo: string;
	details: any;
	user: any;
	id: string;
}

export const MenuOptions = ({
	details,
	id,
	sidebarLogo,
	sidebarOpt,
	subAccounts,
	user,
	defaultOpen,
}: MenuOptionsProps) => {
	return <div>MenuOptions</div>;
};
