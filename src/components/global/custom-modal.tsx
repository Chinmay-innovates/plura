"use client";
import { useModal } from "@/providers/modal-provider";
import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";

type Props = {
	title: string;
	subheading: string;
	children: React.ReactNode;
	defaultOpen?: boolean;
};

const CustomModal = ({ children, defaultOpen, subheading, title }: Props) => {
	const { isOpen, setClose } = useModal();
	return (
		<Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
			<DialogContent className="overflow-y-scroll overscroll-x-hidden md:max-h-[700px] md:h-fit h-screen bg-card custom-scrollbar">
				<DialogHeader className="pt-8 text-left">
					<DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
					<DialogDescription>{subheading}</DialogDescription>
					{children}
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default CustomModal;
