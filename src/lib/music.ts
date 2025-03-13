const STORAGE_URL = "https://storage.keygripmusic.com/music";

type Album = "ep1" | "ep2" | "ep3";

/**
 * Shoulds be called like `getSongURL("ep1", "orbit")`
 * @param album which album tag the song is from
 * @param song the name of the song
 */
export function getSongURL(album: Album, song: string) {
	  return `${STORAGE_URL}/${album}/${song}.wav` as const;
}