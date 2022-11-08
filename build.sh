#!/bin/sh
cd ../
mkdir output
mkdir output_temp
cp -R ./[your-repository-name]/* ./output
cp -R ./[your-repository-name]/* ./output_temp
cp -R ./output ./[your-repository-name]/
cp -R ./output_temp ./[your-repository-name]/
