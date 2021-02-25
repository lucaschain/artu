package main

import (
	"fmt"
	"image"
	"image/color"
	"image/png"
	"os"
)

type forEachImagePixelCallback = func(x, y int, color color.Color)

type ColorMap = map[color.Color]string

func main() {
  if len(os.Args) == 1 {
    fmt.Println("Passe o nome da imagem como argumento:\n./criador_de_mapas arquivo.png")
    os.Exit(1)
  }
  imageName := os.Args[1]
  existingImageFile, err := os.Open(fmt.Sprintf("img/%s", imageName))
  if err != nil {
    panic(err)
  }
  defer existingImageFile.Close()

  existingImageFile.Seek(0, 0)

  decodedImage, err := png.Decode(existingImageFile)
  if err != nil {
    panic(err)
  }

  forEachImagePixel(decodedImage, func (x, y int, color color.Color) {
    tileName := tileStringForColor(color)
    if tileName != "" {
      fmt.Printf("new %s({x: %d, y: %d}),\n", tileName, x, y)
    }
  })
}

func tileStringForColor(targetColor color.Color) string {
  colorMap := ColorMap{
    color.NRGBA{0x00, 0x00, 0x00, 0xff}: "Block",
    color.NRGBA{0x67, 0x3a, 0xb7, 0xff}: "Gate",
    color.NRGBA{0x4c, 0xaf, 0x50, 0xff}: "Goal",
    color.NRGBA{0x79, 0x55, 0x48, 0xff}: "Sign",
    color.NRGBA{0x21, 0x96, 0xf3, 0xff}: "SpeechListener",
  }

  return colorMap[targetColor]
}

func forEachImagePixel(image image.Image, callback forEachImagePixelCallback) {
  size := image.Bounds().Size()
  width := size.X
  height := size.Y

  for x := 0; x < width; x++ {
    for y := 0; y < height; y++ {
      callback(x, y, image.At(x, y))
    }
  }
}
