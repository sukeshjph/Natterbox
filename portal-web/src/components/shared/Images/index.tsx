import React from "react"
import AccountSVG from "../../../assets/icons/account.svg"
import BeginningSVG from "../../../assets/icons/beginning.svg"
import DeleteSVG from "../../../assets/icons/delete.svg"
import DownloadSVG from "../../../assets/icons/download.svg"
import FilterActiveSVG from "../../../assets/icons/filterActive.svg"
import FilterInActiveSVG from "../../../assets/icons/filterInactive.svg"
import SettingsSVG from "../../../assets/icons/settings.svg"
import PlusSVG from "../../../assets/icons/plus.svg"
import PlaybackBackwardSVG from "../../../assets/icons/playback-backward.svg"
import PlaybackForwardSVG from "../../../assets/icons/playback-forward.svg"
import DownSVG from "../../../assets/icons/down.svg"
import CheckBoxActiveSVG from "../../../assets/icons/checkBoxActive.svg"
import SearchSVG from "../../../assets/icons/search.svg"
import LogoutSVG from "../../../assets/icons/logout.svg"
import PauseSVG from "../../../assets/icons/paused.svg"
import ZoomInSVG from "../../../assets/icons/zoom-in.svg"
import ZoomOutSVG from "../../../assets/icons/zoom-out.svg"

export const AccountIcon = () => <img src={AccountSVG} alt="Account" />
export const BeginningIcon = () => <img src={BeginningSVG} alt="Beginning" />
export const DeleteIcon = () => <img src={DeleteSVG} alt="Delete" />
export const DownloadIcon = () => <img src={DownloadSVG} alt="Download" />
export const LogoutIcon = () => <img src={LogoutSVG} alt="Logout" />
export const FilterActiveIcon = () => (
  <img src={FilterActiveSVG} alt="Filter Active" />
)
export const FilterInactiveIcon = () => (
  <img src={FilterInActiveSVG} alt="Filter Inactive" />
)
export const PlaybackwardIcon = () => (
  <img src={PlaybackBackwardSVG} alt="Playback Backward" />
)
export const PlaybackForwardIcon = () => (
  <img src={PlaybackForwardSVG} alt="Playback forward" />
)

export const SettingsIcon = () => <img src={SettingsSVG} alt="Settings Icon" />
export const PlusIcon = () => <img src={PlusSVG} alt="Plus Icon" />
export const EndIcon = () => (
  <img
    src={BeginningSVG}
    alt="End Icon"
    style={{ transform: "rotatey(180deg)" }}
  />
)
export const DownIcon = () => <img src={DownSVG} alt="Down Icon" />

export const UpIcon = () => (
  <img src={DownSVG} alt="Up Icon" style={{ transform: "rotatey(180deg)" }} />
)

export const CheckBoxFilledIcon = () => (
  <img
    src={CheckBoxActiveSVG}
    alt="Checkbox Filled"
    style={{ transform: "rotatey(60deg)" }}
  />
)

export const SearchIcon = () => <img src={SearchSVG} alt="Search Icon" />

export const PauseIcon = () => <img src={PauseSVG} alt="Pause Icon" />

export const ZoomInIcon = () => <img src={ZoomInSVG} alt="Zoom In Icon" />
export const ZoomOutIcon = () => <img src={ZoomOutSVG} alt="Zoom Out Icon" />
