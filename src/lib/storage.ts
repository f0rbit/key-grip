const STORAGE_URL = "https://storage.keygripmusic.com";

type Album = "ep1" | "ep2" | "ep3";

/**
 * @example getSongURL("ep1", "orbit")
 * @param album which album tag the song is from
 * @param song the name of the song
 */
export function getSongURL(album: Album, song: string) {
	  return `${STORAGE_URL}/music/${album}/${song}.wav` as const;
}

/**
 * @example getVideoURL("walking_forest")
 * @param name the name of the video
 */
export function getVideoURL(name: string) {
	return `${STORAGE_URL}/videos/${name}.mp4` as const;
}