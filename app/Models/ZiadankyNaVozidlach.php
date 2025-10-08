<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Model for the ZIADANKY_NA_VOZIDLACH table.
 *
 * Notes:
 * - The primary key is a non-incrementing string stored in `ID_Ziadanky`.
 * - Timestamps are disabled because the table doesn't have created_at/updated_at columns.
 * - The table and column names are kept as in the SQL dump (including the accented column name).
 *
 * @property string|null $STATUS
 * @property string|null $KOSTL
 * @property string|null $datum_vystavenia
 * @property string|null $datum_schvalenia
 * @property string|null $dátum_vybavenia
 * @property string|null $cas_schvalenia
 * @property string $ID_Ziadanky
 */
class ZiadankyNaVozidlach extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'ZIADANKY_NA_VOZIDLACH';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'ID_Ziadanky';

    /**
     * The "type" of the primary key.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The model does not have created_at/updated_at timestamps.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     * Note: the accented column name is included as-is; access it via quoted array keys or
     * using the attribute methods ($model->{"dátum_vybavenia"}).
     *
     * @var array
     */
    protected $fillable = [
        'STATUS',
        'KOSTL',
        'datum_vystavenia',
        'datum_schvalenia',
        'dátum_vybavenia',
        'cas_schvalenia',
        'ID_Ziadanky',
    ];

    /**
     * Optionally, you can add attribute accessors to normalize the accented column name.
     * Example getters/setters could be added if you prefer to use a plain ASCII attribute name
     * in your PHP code (e.g. datum_vybavenia_ascii).
     */
}
