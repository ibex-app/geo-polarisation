

df = pd.read_csv("../final-data//gpt.csv", index_col=None,  parse_dates=['created_at'])
df['month_year_str'] = df['created_at'].dt.to_period('M')


register_matplotlib_converters()
discourses_dict = {
    "oligarchy": ["oligarchy_AntiIvanishvili", "oligarchy_ProIvanishvili"],
    "polarisation": ["polarisation_GovGuilt", "polarisation_OpositionGuilt"],
    "august_war": ["august_war_RussianGuilt", "august_war_GeorgianGuilt"],

   ....
}

all_value_columns = list(discourses_dict.keys()) + list(chain.from_iterable(discourses_dict.values()))

def filter_df(true_columns=[], parties=[], date_range=(datetime(2020, 1, 1), datetime(2023, 12, 31))):
    df_filtered = df.copy()
    mask = df['created_at'].between(*date_range)
    if true_columns:
        mask &= df[true_columns].any(axis=1)
    df_filtered = df[mask].copy()

    if parties:
        df_filtered = df_filtered[df_filtered.party.isin(parties)]
    else:
        columns_to_sum = true_columns if len(true_columns) else all_value_columns
        df_filtered["values_sum"] = df_filtered.apply(lambda row: sum(row[col] for col in columns_to_sum), axis=1)
        total_counts_by_party = df_filtered['party'].value_counts()
        top_5_parties = total_counts_by_party.head(5).index.tolist()
        df_filtered = df_filtered[df_filtered.party.isin(top_5_parties)]

    return df_filtered


def plot_discourse_counts(discourse, parties = []):

    df_filtered = filter_df([discourse], parties)
    grouped_count = df_filtered.groupby(['month_year_str', 'party']).size().reset_index(name='count')
    grouped_count['month_year_str'] = grouped_count['month_year_str'].dt.to_timestamp()
    pivot_count = grouped_count.pivot(index='month_year_str', columns='party', values='count').fillna(0)


    plt.figure(figsize=(15, 8))
    sns.lineplot(data=pivot_count)
    plt.title(f'Monthly Count of {discourse.capitalize()} Entries by Party')
    plt.xticks(rotation=45)
    plt.grid(True)
    plt.tight_layout()
    plt.legend(title='Party', loc='center left', bbox_to_anchor=(1, 0.5))
    ...


def plot_discourse_poles_count(discourse, parties = []):
    pole_a, pole_b = discourses_dict[discourse]
    df_filtered_pole_a = filter_df([pole_a], parties)
    df_filtered_pole_b = filter_df([pole_b], parties)
    df_filtered = pd.concat([df_filtered_pole_a, df_filtered_pole_b])

    grouped_pos_neg = df_filtered.groupby(['month_year_str', 'party']).agg(
        positive_sum=(pole_a, 'sum'),
        negative_sum=(pole_b, 'sum')
    ).reset_index()

    grouped_pos_neg['negative_sum'] = -grouped_pos_neg['negative_sum']

    merged_pos_neg = pd.melt(grouped_pos_neg, id_vars=['month_year_str', 'party'],
                             value_vars=['positive_sum', 'negative_sum'])
    merged_pos_neg['month_year_str'] = merged_pos_neg['month_year_str'].dt.to_timestamp()

    plt.figure(figsize=(15, 8))
    ...
