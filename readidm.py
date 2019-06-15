import nfc
import binascii
from time import sleep
from multiprocessing import Process

clf = nfc.ContactlessFrontend()
try:
    clf.open('usb:054c')
except:
    print('failed')
    print('Felica could not found')


def connected(tag):
    try:
        print(binascii.hexlify(tag.idm).decode())
    except:
        print('failed')
        print('IDm cound not found')

def run():
    clf.connect(rdwr={'on-connect': connected})

p = Process(target=run)
p.start()

c = 0
while (p.is_alive() and c < 50):
    sleep(0.1)
    c += 1

if (p.is_alive()):
    p.kill()
    print('timeout')
