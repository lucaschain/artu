package main

import (
	"fmt"
	"image"
	"image/color"
	"image/png"
	"math"
	"os"
)

type forEachImagePixelCallback = func(x, y int, color color.Color)

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
    if isBlack(color) {
      fmt.Printf("new Block({x: %d, y: %d}),\n", x, y)
    }
  })
}

func isBlack(color color.Color) bool {
  red, green, blue, alpha := color.RGBA()

  return red == 0 && green == 0 && blue == 0 && alpha == math.MaxUint16
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
