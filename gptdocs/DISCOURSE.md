
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