"use client";

import {
	Agency,
	AgencySidebarOption,
	SubAccount,
	SubAccountSidebarOption,
} from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
	ChevronsUpDown,
	Compass,
	Menu,
	PlusCircleIcon,
	SearchXIcon,
	UserSearchIcon,
} from "lucide-react";
import clsx from "clsx";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../ui/command";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { icons } from "@/lib/constants";

import AgencySidebar from "./agency-sidebar";
import SubAccountSidebar from "./agency-sidebar";
import { useModal } from "@/providers/modal-provider";
import CustomModal from "../global/custom-modal";
import SubAccountDetails from "../forms/sub-account-details";

type Props = {
	defaultOpen?: boolean;
	subAccounts: SubAccount[];
	sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[];
	sidebarLogo: string;
	details: any;
	user: any;
	id: string;
};

export const MenuOptions = ({
	details,
	id,
	sidebarLogo,
	sidebarOpt,
	subAccounts,
	user,
	defaultOpen,
}: Props) => {
	const { setOpen } = useModal();
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
		<Sheet modal={false} {...openState}>
			<SheetTrigger
				asChild
				className="absolute left-4 top-4 z-[100] md:!hidden felx"
			>
				<Button variant="outline" size={"icon"}>
					<Menu />
				</Button>
			</SheetTrigger>

			<SheetContent
				showX={!defaultOpen}
				side={"left"}
				className={clsx(
					"bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6",
					{
						"hidden md:inline-block z-0 w-[350px]": defaultOpen,
						"inline-block md:hidden z-[100] w-full": !defaultOpen,
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
					<Popover>
						<PopoverTrigger asChild>
							<Button
								className="w-full my-4 flex items-center justify-between py-8"
								variant="ghost"
							>
								<div className="flex items-center text-left gap-2">
									<Compass />
									<div className="flex flex-col">
										{details.name}
										<span className="text-muted-foreground">
											{details.address}
										</span>
									</div>
								</div>
								<div>
									<ChevronsUpDown size={16} className="text-muted-foreground" />
								</div>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80 h-full mt-4 z-[200]">
							<Command className="rounded-lg">
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
												<CommandItem className="!bg-transparent my-2 text-primary broder-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
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
												</CommandItem>
											</CommandGroup>
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
								</CommandList>
								{(user?.role === "AGENCY_OWNER" ||
									user?.role === "AGENCY_ADMIN") && (
									<SheetClose asChild>
										<Button
											className="w-full flex gap-2"
											onClick={() => {
												setOpen(
													<CustomModal
														title="Create A Subaccount"
														subheading="You can switch between your agency account and the subaccount from the sidebar"
													>
														<SubAccountDetails
															agencyDetails={user?.Agency as Agency}
															userId={user?.id as string}
															userName={user?.name}
														/>
													</CustomModal>
												);
											}}
										>
											<PlusCircleIcon size={15} />
											Create a sub account
										</Button>
									</SheetClose>
								)}
							</Command>
						</PopoverContent>
					</Popover>
					<p className="text-muted-foreground text-xs mb-2">MENU LINKS</p>
					<Separator className="mb-4" />
					<nav className="relative">
						<Command className="rounded-lg overflow-visible bg-transparent">
							<CommandInput placeholder="Search..." />
							<CommandList className="py-4 overflow-visible">
								<CommandEmpty>
									<span className="flex flex-col items-center text-muted-foreground">
										<SearchXIcon className="size-6 mb-2 items-center text-muted" />
										No results found
									</span>
								</CommandEmpty>
								<CommandGroup className="overflow-visible">
									{sidebarOpt.map((sidebarOptions) => {
										let val;
										const result = icons.find(
											(icon) => icon.value === sidebarOptions.icon
										);
										if (result) val = <result.path />;
										return (
											<CommandItem
												key={sidebarOptions.id}
												className="md:w-[350px] w-full"
											>
												<Link
													href={sidebarOptions.link}
													className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
												>
													{val}
													<span>{sidebarOptions.name}</span>
												</Link>
											</CommandItem>
										);
									})}
								</CommandGroup>
							</CommandList>
						</Command>
					</nav>
				</div>
			</SheetContent>
		</Sheet>
	);
};
