#!/bin/bash

# 入力個所
logdir="ログ保存ディレクトリを指定(末尾にスラッシュ不要)"
maxtemp="CPU温度の上限値を指定(例：60度なら60000)"

# 日時とCPU温度
date=$(date "+%Y-%m-%d %H:%M:%S")
today=$(date "+%Y-%m-%d")
logfile="${logdir}/${today}.log"
temp=$(cat /sys/class/thermal/thermal_zone0/temp)

# ログ生成
if [ ! -e $logfile ]; then
    touch $logfile
fi

# ログ出力
echo "$date,$temp" >> $logfile

# 温度上昇時の処理
if [ $temp \> $maxtemp ]; then
    #設定を間違えると、
    #ラズパイが起動しても
    #すぐ直後にシャットダウンされる事態になるので、
    #慎重に設定してください
    #eval "sudo shutdown -t 120"
    echo "hoge"
fi

exit 0
