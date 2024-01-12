+++
title = "(Re-)installing Windows"
date = "2024-01-10"
description = "Step-by-step guide for installing a fresh copy of windows or replacing an existing one."
[taxonomies]
tags = ["pc", "software"]
[extra]
cover_image = "images/windows-bloom.png"
+++

# **UNDER CONSTRUCTION**
---
---
---

In the following guide, we will go over the steps needed to install Windows for the first time and for reinstalling an already existing installation. The images for the steps are shown in a <abbr title="Virtual Machine">VM</abbr>, but the installation procedure is exactly the same when installing for bare-metal hardware.

# Backing up old Data

The first step only applies for reinstalls and includes backing up all important existing data. It can also be applicable when switching from an old system to a new one, where you want to keep some data as well. For backup storage, possible methods are:

- External drive, like a portable HDD/SSD
- <abbr title="Network Attached Storage">NAS</abbr> connected to the home network
- Cloud storage providers
- A phone with sufficient storage and media access within Windows

The data you most likely want to back up can cover:

- Pictures, Videos and Documents
- Browser data (including bookmarks, saved passwords, browsing history)
- Game settings and save files
- Other program-specific data, like Photoshop plugins etc...

Especially for reinstalls, **MAKE SURE TO GET EVERYTHING**. After reinstalling, recovery of old deleted data can be very hard or near impossible. If you are unsure about a specific program's settings, don't hesitate to google how you can backup its data. Some browsers and most game launchers also have the ability to store data in their cloud. This can be an effective method for data transfer as well.

# Create the Installation Medium

Next, we create the installation medium where we store the files for the Windows installer. The requirements for this are:

- USB drive with at least 8 GB of storage
- Second PC or Laptop

For the USB drive, all contents will be deleted when formatting for the installer, so it's a good idea to back those up as well if they are of importance.

If you don't have a second PC, ask a friend or family member if you can download the installer on their system. A public system, for example in a library, can also do. Administrator access is not required to create the installation medium.

{% admonition(type="note", title="Note") %}
Creating the installation medium on macOS can be hit or miss, the steps for doing so are also rather complicated. Usage of a Windows or Linux system is preferred.
{% end %}

{% admonition(type="info", title="Info") %}
For those more technically inclined: writing the ISO to the drive via `dd` will not work, the installer will not boot. It has to be written via ISO-copy mode.
{% end %}

For creating the installation medium, these are the three main methods:

## Option 1: MCT

Official tool.

[Windows 11](https://www.microsoft.com/en-us/software-download/windows11)

## Option 2: Rufus

Get ISO.
Robust. Can bypass some Windows 11 restrictions in a user-friendly way.

[Rufus](https://rufus.ie/en/)

## Option 3: Ventoy

Also needs ISO.
Multiple ISOs on one drive.
Useful for Tools [MemTest86](https://www.memtest86.com/) or Linux distros.
Some more functionality like preserved space for other data (like normal USB stick).

[Ventoy](https://www.ventoy.net/en/index.html)

# Setting up the UEFI

Confront mainboard manual for specific instructions.
Update if not on newest version, update file can be on installation medium.
For Windows 11: CSM/legacy off, secure boot on, (f)TPM on, enroll factory keys.

# Preparing Drives

Disconnect every drive you don't want Windows installed on.
Plug in installation medium and (re)boot.
In UEFI or during boot, select the usb drive as boot override.

# Installation

## Select Language

![language](/images/windows-install/setup-language.png)

## Product Key

![product key](/images/windows-install/setup-key.png)

License. Can also be skipped for now.
Digital licenses connected to Microsoft accounts can be migrated from an old system later.

When buying licenses, look for CoA sticker or, for OEM, documentation of license origin and transfer. Some sites sell keys only, illegitimate. When going the illegal route, can also use activation scripts (MAS) - free and no data for third parties.

## Choose Version

![version](/images/windows-install/setup-version.png)

Windows 11 Home or Pro

Differences are marginal for gaming use

Then accept the license terms and continue

## Drive Setup

![previous installation](/images/windows-install/setup-disks-written.png)

![drive selection](/images/windows-install/setup-disks-free.png)

Choose custom install

If there are already partitions, delete all.
Press next on free space.

It will install, then reboot. You can remove the installation medium.
If setup starts again, check your boot sequence.

## First Start Setup

![telemetry](/images/windows-install/post-setup-telemetry.png)

Go through installation, Windows will explain things along the way.
Good rule of thumb: say no to everything, be it telemetry, OneDrive or anything else. Opt-out sometimes really hidden.

Tip: needs internet, sometimes drivers are not provided by installation medium. Shift+F10 and `OOBE\BYPASSNRO`

![offline account](/images/windows-install/post-setup-ms-account.png)

![offline oops](/images/windows-install/post-setup-oops.png)

Tip: offline install - type a@a.com for email, then a for password

# Post Installation

![finished](/images/windows-install/finished-install.png)

See [my other post](@/setting-up-windows.md)
