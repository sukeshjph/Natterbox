import React from "react"
import ReactAudioPlayer from "react-audio-player"

const areEqual = (prevProps, nextProps) => {
  return prevProps.audioUrl === nextProps.audioUrl
}

export const CallLogStreamPlayer: React.FC<{
  audioUrl: string
}> = React.memo(
  ({ audioUrl }) => <ReactAudioPlayer autoPlay controls src={audioUrl} />,
  areEqual,
)
