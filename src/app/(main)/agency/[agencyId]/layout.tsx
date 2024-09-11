import BlurPage from "@/components/global/blur-page";
import InfoBar from "@/components/global/info-bar";
import Sidebar from "@/components/sidebar";
import Unauthorized from "@/components/unauthorized";
import {
	getNotificationAndUser,
	verifyAndAcceptInvitation,
} from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface LayoutProps {
	children: React.ReactNode;
	params: {
		agencyId: string;
	};
}

const AgencyIdLayout = async ({ children, params }: LayoutProps) => {
	const agencyId = await verifyAndAcceptInvitation();
	const user = await currentUser();

	if (!user) return redirect("/");

	if (!agencyId) return redirect("/agency");

	if (
		user.privateMetadata.role !== "AGENCY_OWNER" &&
		user.privateMetadata.role !== "AGENCY_ADMIN"
	)
		return <Unauthorized />;

	let allNoti: any = [];
	const notifications = await getNotificationAndUser(agencyId);
	if (notifications) allNoti = notifications;

	return (
		<div className="h-screen overflow-hidden">
			<Sidebar type="agency" id={params.agencyId} />
			<div className="md:pl-[350px]">
				<InfoBar notifications={allNoti} />
				<div className="relative">
					<BlurPage>{children}</BlurPage>
				</div>
			</div>
		</div>
	);
};

export default AgencyIdLayout;
