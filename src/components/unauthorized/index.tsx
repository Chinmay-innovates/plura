import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const Unauthorized = (props: Props) => {
	return (
		<div className="p-4 text-center h-screen w-screen flex justify-center items-center flex-col">
			<h1 className="text-3xl md:text-6xl">Unauthorized acccess!</h1>
			<p>Please contact support or your agency owner to get access</p>
			<Button
            asChild
            size="lg"
            variant="default"
            >
				<Link
					href="/"
					className="mt-4 bg-primary hover:bg-blue-600"
				>
					Back to home
				</Link>
			</Button>
		</div>
	);
};

export default Unauthorized;
