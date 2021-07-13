# edl-to-yt

When using DaVinci Resolve, you can export all of your markers on your timeline as an EDL file. Those contains the timestamp as well as the name of those markers.

This simple CLI tool allow you to process that file and generate a YouTube-friendly chapter generator.

## Usage

```bash
npx edl-to-yt -p <path to your EDL file>
```

## Sample output

If you don't have a marker at the `00:00` point of your video, one will automatically be created for you and be called `Intro`.

```none
00:00 Intro
00:15 Chapter 1
01:47 Chapter 2
01:59 Chapter 3
02:38 Chapter 4
03:01 Chapter 5
03:35 Chapter 6
05:06 Chapter 7
05:32 Conclusion
```