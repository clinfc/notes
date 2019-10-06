<?php
namespace Time;

date_default_timezone_set('Asia/Shanghai');

class Time
{
    /**
     * 返回距今日±n天的开始和结束的时间戳
     *
     * @param int $n 天数
     * @return array
     */
	public static function day($n = 0)
	{
		list($y, $m, $d) = explode('-', date('Y-m-d', strtotime("{$n} day", time())));
		return [
			mktime(0, 0, 0, $m, $d, $y),
			mktime(23, 59, 59, $m, $d, $y)
		];
	}

	/**
     * 返回今日开始和结束的时间戳
     *
     * @return array
     */
	public static function today()
	{
		list($y, $m, $d) = explode('-', date('Y-m-d'));
		return [
			mktime(0, 0, 0, $m, $d, $y),
			mktime(23, 59, 59, $m, $d, $y)
		];
	}

    /**
     * 返回昨日开始和结束的时间戳
     *
     * @return array
     */
	public static function yesterday()
	{
		return self::day(-1);
	}

    /**
     * 返回明日开始和结束的时间戳
     *
     * @return array
     */
	public static function tomorrow()
	{
		return self::day(1);
	}

    /**
     * 返回n天前的时间戳
     *
     * @param int $n 天数
     * @return timestamp
     */
	public static function daysAgo($n = 0)
	{
		$n < 0 ?: $n = -$n;
		return strtotime("{$n} day", time());
	}

    /**
     * 返回n天后的时间戳
     *
     * @param int $n 天数
     * @return timestamp
     */
	public static function daysAfter($n = 0)
	{
		return strtotime("{$n} day", time());
	}

    /**
     * 返回距本周±n周的开始和结束的时间戳
     *
     * @param int $n 周数
     * @return array
     */
	public static function week($n = 0)
	{
		list($y, $m, $d, $w) = explode('-', date('Y-m-d-w', strtotime("{$n} week", time())));
		if ($w == 0) $w = 7; //修正周日的问题
		return [
			mktime(0, 0, 0, $m, $d - $w + 1, $y),
			mktime(23, 59, 59, $m, $d - $w + 7, $y)
		];
	}

    /**
     * 返回本周开始和结束的时间戳
     *
     * @return array
     */
	public static function thisWeek()
	{
		return self::week();
	}

    /**
     * 返回上周开始和结束的时间戳
     *
     * @return array
     */
	public static function lastWeek()
	{
		return self::week(-1);
	}

    /**
     * 返回下周开始和结束的时间戳
     *
     * @return array
     */
	public static function nextWeek()
	{
		return self::week(1);
	}

    /**
     * 返回n周前的时间戳
     *
     * @param int $n 周数
     * @return timestamp
     */
	public static function weeksAgo($n = 0)
	{
		$n < 0 ?: $n = -$n;
		return strtotime("{$n} week", time());
	}

    /**
     * 返回n周后的时间戳
     *
     * @param int $n 周数
     * @return timestamp
     */
	public static function weeksAfter($n = 0)
	{
		return strtotime("{$n} week", time());
	}


    /**
     * 返回距本月±n月的开始和结束的时间戳
     *
     * @param int $n 月数
     * @return array
     */
	public static function month($n = 0)
	{
		$start = strtotime(date('Y-m', strtotime("{$n} month", time())));
		list($y, $m, $t) = explode('-', date('Y-m-t', $start));
		return [
			$start,
			mktime(23, 59, 59, $m, $t, $y)
		];
	}

    /**
     * 返回本月开始和结束的时间戳
     *
     * @return array
     */
	public static function thisMonth()
	{
		list($y, $m, $t) = explode('-', date('Y-m-t'));
		return [
			mktime(0, 0, 0, $m, 1, $y),
			mktime(23, 59, 59, $m, $t, $y)
		];
	}

    /**
     * 返回上月开始和结束的时间戳
     *
     * @return array
     */
	public static function lastMonth()
	{
		return self::month(-1);
	}

    /**
     * 返回下月开始和结束的时间戳
     *
     * @return array
     */
	public static function nextMonth()
	{
		return self::month(1);
	}

	/**
     * 返回n月前的时间戳
     *
     * @param int $n 月数
     * @return timestamp
     */
	public static function monthsAgo($n = 0)
	{
		$n < 0 ?: $n = -$n;
		return strtotime("{$n} month", time());
	}

	/**
     * 返回n月后的时间戳
     *
     * @param int $n 月数
     * @return timestamp
     */
	public static function monthsAfter($n = 0)
	{
		return strtotime("{$n} month", time());
	}
}

function feach($array) {
	foreach ($array as $k => $v) {
		$array[$k] = date('Y-m-d H:i:s', $v);
	}
	echo '<pre>';
	print_r($array);
	echo '</pre>';
}

