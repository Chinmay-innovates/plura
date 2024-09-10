"use client";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import {
	AgencySidebarOption,
	SubAccount,
	SubAccountSidebarOption,
} from "@prisma/client";

import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	ChevronsUpDownIcon,
	CompassIcon,
	MenuIcon,
	PlusCircleIcon,
	UserSearchIcon,
} from "lucide-react";
import Image from "next/image";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from "@/components/ui/command";

import AgencySidebar from "./agency-sidebar";
import SubAccountSidebar from "./agency-sidebar";

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
	const [isMounted, setIsMounted] = useState(false);

	const openState = useMemo(
		() => (defaultOpen ? { open: true } : {}),
		[defaultOpen]
	);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return;

	return (
		<Sheet
			modal={false}
			open={true}
			// {...openState}
		>
			<SheetTrigger
				asChild
				className="absolute left-4 top-4 z-[100] md:!hidden flex"
			>
				<Button variant="outline" size="icon">
					<MenuIcon />
				</Button>
			</SheetTrigger>
			<SheetContent
				side="left"
				showX={!defaultOpen}
				className={clsx(
					"bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6",
					{
						"hidden md:inline-block z-0 w-[350px]": defaultOpen,
						"md:hidden inline-block z-[100] w-full": !defaultOpen,
					}
				)}
			>
				<div>
					<AspectRatio ratio={16 / 5}>
						<Image
							src={sidebarLogo}
							alt="Sidebar Logo"
							fill
							className="rounded-md object-contain"
						/>
					</AspectRatio>
				</div>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							className="w-full my-4 flex items-center justify-between py-8"
							variant="ghost"
						>
							<div className="flex items-center text-left gap-2">
								<CompassIcon />
								<div className="flex flex-col">
									{details.name}
									<span className="text-muted-foreground">
										{details.address}
									</span>
								</div>
							</div>
							<div>
								<ChevronsUpDownIcon
									size={16}
									className="text-muted-foreground"
								/>
							</div>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="size-80 mt-4 z-[200]">
						<Command className="rounded-lg flex flex-col">
							<CommandInput placeholder="Search Accounts..." />
							<CommandList className="pb-16">
								<CommandEmpty>
									<span className="flex flex-col items-center text-muted-foreground">
										<UserSearchIcon className="size-6 mb-2 items-center text-muted" />
										No results found
									</span>
								</CommandEmpty>
								{(user?.role === "AGENCY_OWNER" ||
									user?.role === "AGENCY_ADMIN") &&
									user?.Agency && (
										<CommandGroup heading="Agency">
											<CommandItem className="!bg-transparent m-2 text-primary broder-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
												{defaultOpen ? (
													<AgencySidebar
														href={`/agency/${user?.Agency?.id}`}
														src={user?.Agency?.agencyLogo}
														name={user?.Agency?.name}
														address={user?.Agency?.address}
													/>
												) : (
													<SheetClose asChild>
														<AgencySidebar
															href={`/agency/${user?.Agency?.id}`}
															src={user?.Agency?.agencyLogo}
															name={user?.Agency?.name}
															address={user?.Agency?.address}
														/>
													</SheetClose>
												)}
												<CommandGroup heading="Accounts">
													{!!subAccounts
														? subAccounts.map((subaccount) => (
																<CommandItem key={subaccount.id}>
																	{defaultOpen ? (
																		<SubAccountSidebar
																			href={`/subaccount/${subaccount.id}`}
																			src={subaccount.subAccountLogo}
																			name={subaccount.name}
																			address={subaccount.address}
																		/>
																	) : (
																		<SheetClose asChild>
																			<SubAccountSidebar
																				href={`/subaccount/${subaccount.id}`}
																				src={subaccount.subAccountLogo}
																				name={subaccount.name}
																				address={subaccount.address}
																			/>
																		</SheetClose>
																	)}
																</CommandItem>
														  ))
														: "No Accounts"}
												</CommandGroup>
											</CommandItem>
										</CommandGroup>
									)}
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</SheetContent>
		</Sheet>
	);
};
