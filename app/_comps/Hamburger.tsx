// import { usePathname } from "next/navigation";
// import DarkModelToggle from "./DarkModelToggle";
// import AuthenticatedNav from "./AuthenticatedNav";
// import { useShowSigninModal, useUser } from "../lib/zustand";
// import UserLogo from "./UserLogo";

function Hamburger() {
  // const path = usePathname();
  // const { currUser } = useUser();
  // const { toggleShowModal } = useShowSigninModal();
  return (
    <div>
      <div className="flex flex-col items-center gap-4 text-sm text-[var(--secondarytext)] opacity-90 transition-colors duration-700">
        {/* <UserLogo /> */}
        {/* {path === "/" && currUser === null && (
          <button onClick={() => toggleShowModal(true)} className="text-[var(--secondarytext)]">
            Sign In
          </button>
        )} */}
      </div>
    </div>
  );
}

export default Hamburger;
