import { LogoutButton } from "@/components/Auth/Logout";
import { DropdownModal } from "@/components/Containers/Dropdown";
import { Divider } from "@/components/Misc/Divider";
import { Loading } from "@/components/Misc/Loading";
import { Avatar } from "@/components/Profile/Avatar";
import { useOAuth } from "@/lib/providers/oauth";
import { LucideCircleUserRound } from "lucide-react";

export const NavBarAuthed = () => {
    const oauth = useOAuth();
    const { session } = oauth;
    const did = session ? session.did : null;
    const repoUrl = session ? new URL(session.server.issuer) : null;
    // const {
    //     isLoading: isAvatarLoading,
    //     data: avatarQueryData,
    //     error: avatarQueryError,
    // } = useAvatarQuery({ did, repoUrl });

    // const avatarUri = avatarQueryData === "#" ? undefined : avatarQueryData;
    const avatarUri =
        "https://pds.goldweaver.systems/xrpc/com.atproto.sync.getBlob?did=did:plc:nrri2qphzxtjdnptjrpvg4wn&cid=bafkreige5f6fkwi4edszg2eso2ldz3g3gitksprszd6dalu6qeoxmrsn3y";

    return (
        <div className="bg-base flex flex-col w-full items-center justify-between p-3 overflow-auto h-full">
            <div className="flex items-center gap-1 flex-1">
                {/* <UnderlineIconRouterLink */}
                {/*     to="/" */}
                {/*     label="Strand" */}
                {/*     icon={<StrandIcon />} */}
                {/*     iconClassName="text-text" */}
                {/*     labelClassName="text-text" */}
                {/*     underlineClassName="bg-text" */}
                {/*     className="pl-2 text-lg font-semibold" */}
                {/* /> */}
                woke
            </div>
            <div className="flex basis-1/8 shrink-0 items-center gap-1">
                <div>
                    {/* {isAvatarLoading ? ( */}
                    {/*     <div className="flex min-w-10 h-12 items-center"> */}
                    {/*         <Loading /> */}
                    {/*     </div> */}
                    {/* ) : avatarQueryError ? ( */}
                    {/*     <p>{avatarQueryError.message}</p> */}
                    {/* ) : ( */}
                    <AvatarWithDropdown uri={avatarUri} />
                    {/* )} */}
                </div>
            </div>
        </div>
    );
};

const AvatarWithDropdown = ({ uri }: { uri: string | undefined }) => {
    // const [showDropdown, setShowDropdown] = useState(false);
    const { handle } = useOAuth();

    // const dropdownRef = useRef<HTMLDivElement>(null);

    // useModalEscapeEffect({ setShowModal: setShowDropdown });
    // useModalMousedownEffect({
    //     setShowModal: setShowDropdown,
    //     modalRef: dropdownRef,
    // });

    const AvatarButton = <Avatar uri={uri} />;

    const profileIcon = <LucideCircleUserRound height={16} width={16} />;

    return (
        <DropdownModal
            buttonComponent={AvatarButton}
            className="bg-surface0 flex w-48 flex-col rounded-sm"
        >
            {/* <UnderlineIconRouterLink */}
            {/*     to={`/${handle}`} */}
            {/*     label="Profile" */}
            {/*     icon={profileIcon} */}
            {/*     className="hover:bg-surface1 gap-2 rounded-t-sm p-2 pl-4 transition-all" */}
            {/*     labelClassName="text-sm text-text" */}
            {/*     underlineClassName="bg-text" */}
            {/*     iconClassName="text-text" */}
            {/*     iconVariants={{}} */}
            {/* /> */}
            <Divider className="m-0" />
            <LogoutButton />
        </DropdownModal>
    );
};
