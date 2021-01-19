import zipfile
import os
import sys
import re

"""
Esta clase realiaza la compresión de archivos.
@author: POO
@version: 1.0.0
"""
class Compress():
    def __init__(self):
        pass

    """
    Este metodo revisa los archivos de una ruta y busca los archivos que el usuario quiera comprimir.
    @param list Los archivos a comprimir separados por una coma.
    """
    def compressFile(self,list):
        list = str(list)
        list = list.strip("[]'")
        add = list.split(',')

        music = zipfile.ZipFile(sys.argv[1],"w")
        for folder, subfolders, files in os.walk(sys.argv[2]):
            for file in files:
                for song in add:
                    if song == file:
                        music.write(os.path.join(folder, file), os.path.relpath(os.path.join(folder,file), sys.argv[2]), compress_type = zipfile.ZIP_DEFLATED)
        music.close()

list = sys.argv[3:]
(Compress()).compressFile(list)