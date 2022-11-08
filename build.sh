#!/bin/sh
cd ../
mkdir output
cp -R ./[your-repository-name]/* ./output
cp -R ./[your-repository-name]/* ./output_temp
cp -R ./output ./[your-repository-name]/
